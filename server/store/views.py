from rest_framework.response import Response 
from .models import Category, Product, UserProfile, Order, OrderItem, Card, Carditem
from .serializers import CategorySerializer, ProductSerializer, CardItemSerializer, CardSerializer
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

@api_view(['GET'])
def get_card(request): 
    card, created = Card.objects.get_or_create(user=None)
    serillizers = CardSerializer(card)
    return Response(serillizers.data)

@api_view(['POST'])
def add_to_card(request):
    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)
    card, created = Card.objects.get_or_create(user=None)
    item, created =  Carditem.objects.get_or_create(card=card, product=product)

    if not created : 

        item.quantity += 1 
        item.save 

    return Response({'message' : 'product is sucessfully added'})


@api_view(['POST'])
def remove_from_card(request):
    item_id = request.data.get('item_id')
    Carditem.objects.filter(id=item_id).delete()
    return Response({'message':'items is sucessfully remove from card'})

