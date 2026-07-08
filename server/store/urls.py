from django.urls import path 
from .import views   
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [ 
    path('register/', views.register_user),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', views.get_products),
    path('products/<int:pk>/', views.get_product),
    path('categories/', views.get_categories),
    path('card/', views.get_card),
    path('card/add/', views.add_to_card),
    path('card/remove/', views.remove_from_card),
    path('update/', views.update_card_quantity),
    path('order/create/', views.order_create),
]