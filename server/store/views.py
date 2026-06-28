from rest_framework.response import Response 
from .models import Category, Product, UserProfile, Order, OrderItem 
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.decorators import api_view 

@api_view(['GET']) 
def get_products(request):
    products = Product.objects.all()  
    serializer = ProductSerializer(products, many=True) 
    return Response(serializer.data) 

@api_view(['GET']) 
def get_product(request, pk) : 
    try: 
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, context = {'request' : request})
        return Response(serializer.data)

    except:
        return Response({'error' : "Product is not found"} , status=404)


@api_view(['GET']) 
def get_categories(request):
    categories = Category.objects.all()  
    serializer = CategorySerializer(categories, many=True) 
    return Response(serializer.data) 



