from rest_framework import serializers 
from .models import Category, Product, UserProfile, Order, OrderItem , Card , Carditem

class CategorySerializer(serializers.ModelSerializer):
    class Meta : 
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer): 
    category = CategorySerializer(read_only=True) 
    class Meta : 
        model = Product
        fields = '__all__' 

class CardItemSerializer(serializers.ModelSerializer): 

    product_name = serializers.CharField(source='product.name', read_only = True)
    product_price = serializers.DecimalField(source='product.price', read_only = True,max_digits=10, decimal_places=2)
    product_image = serializers.ImageField(source='product.image', read_only = True)

    class Meta : 
        model = Carditem 
        fields = '__all__' 

class CardSerializer(serializers.ModelSerializer):

    items = CardItemSerializer(
        many=True,
        read_only=True
    )

    total = serializers.ReadOnlyField()

    class Meta:
        model = Card
        fields = '__all__'

