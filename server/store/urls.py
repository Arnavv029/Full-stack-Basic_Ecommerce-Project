from django.urls import path 
from .import views   

urlpatterns = [ 
    path('products/', views.get_products),
    path('products/<int:pk>/', views.get_product),
    path('categories/', views.get_categories),
    path('card/', views.get_card),
    path('card/add/', views.add_to_card),
    path('card/remove/', views.remove_from_card),
]