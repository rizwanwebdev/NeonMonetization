from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class UserBalance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    today_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    this_week_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    this_month_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    month = models.CharField(max_length=20, default=timezone.now().strftime("%B"))
    website_name = models.CharField(max_length=100, default="neonmonetization.com")

    daily_updates = models.IntegerField(default=0)  # ✅ NOW TRACKS YESTERDAY'S BALANCE UPDATES
    weekly_updates = models.IntegerField(default=0)
    monthly_updates = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    is_approved = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        """
        Automatically update balances when today_balance is changed from the admin panel.
        """

        # ✅ Prevent updates for unapproved users
        if not self.is_approved:
            super().save(*args, **kwargs)
            return

        try:
            # ✅ Get yesterday's balance before saving
            previous_balance = UserBalance.objects.get(pk=self.pk).today_balance
        except UserBalance.DoesNotExist:
            previous_balance = 0

        # ✅ Step 1: Move yesterday's balance to the weekly balance
        if previous_balance > 0:
            self.this_week_balance += previous_balance
              # ✅ Reset today’s balance
            self.daily_updates += 1  # ✅ Track yesterday’s balance being added to week

        # ✅ Step 2: After 7 daily_updates, move weekly balance to monthly balance
        if self.daily_updates >= 7:
            self.this_month_balance += self.this_week_balance
            self.this_week_balance = 0
            self.daily_updates = 0
            self.weekly_updates += 1  # ✅ Increase weekly update count

        # ✅ Step 3: After 4 weekly updates, move monthly balance to total balance
        if self.weekly_updates >= 4:
            self.total_balance += self.this_month_balance
            self.this_month_balance = 0
            self.weekly_updates = 0
            self.monthly_updates += 1

        # ✅ Step 4: Update the current month
        self.month = timezone.now().strftime("%B")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username}'s Earnings (Approved: {self.is_approved})"




class Withdraw(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to user
    withdraw_number = models.CharField(max_length=50)  # Example: "Withdraw #1"
    withdraw_amount = models.CharField(max_length=50)  # Example: "$500"
    withdraw_method = models.CharField(max_length=50)  # Example: "PayPal"
    date_time = models.CharField(max_length=100)  # Example: "2025-03-06 10:30 AM"

    def __str__(self):
        return f"{self.user.username} - {self.withdraw_number} - {self.withdraw_amount}"

