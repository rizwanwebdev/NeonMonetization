from django.contrib import admin
from .models import UserBalance, Withdraw  # Import Withdraw model

class UserBalanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'today_balance', 'this_week_balance', 'this_month_balance', 'total_balance', 'month', 'website_name', 'is_approved')
    search_fields = ('user__username', 'website_name')
    list_filter = ('is_approved', 'month')

    actions = ["approve_selected_users"]

    @admin.action(description="Approve selected users")
    def approve_selected_users(self, request, queryset):
        queryset.update(is_approved=True)

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(is_approved=True)

admin.site.register(UserBalance, UserBalanceAdmin)

# ✅ Register the Withdraw model
class WithdrawAdmin(admin.ModelAdmin):
    list_display = ('user', 'withdraw_number', 'withdraw_amount', 'withdraw_method', 'date_time')
    search_fields = ('user__username', 'withdraw_number', 'withdraw_method')

admin.site.register(Withdraw, WithdrawAdmin)
