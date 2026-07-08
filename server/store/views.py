from rest_framework.response import Response 
from .models import Category, Product, UserProfile, Order, OrderItem, Card, Carditem
from .serializers import CategorySerializer, ProductSerializer, CardItemSerializer, CardSerializer, UserSerializer, UserRegistrationSerializer
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated, AllowAny 


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
@permission_classes([IsAuthenticated])
def get_card(request): 
    card, created = Card.objects.get_or_create(user=request.user)
    serillizers = CardSerializer(card)
    return Response(serillizers.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_card(request):
    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)
    card, created = Card.objects.get_or_create(user=request.user)
    item, created =  Carditem.objects.get_or_create(card=card, product=product)

    if not created : 

        item.quantity += 1 
        item.save()

    return Response({'message' : 'product is sucessfully added'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_card(request):
    item_id = request.data.get('item_id')
    Carditem.objects.filter(id=item_id).delete()
    return Response({'message':'items is sucessfully remove from card'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_card_quantity(request) : 

    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    if not item_id or quantity is None : 
        return Response({"error": "item id and quantity is requert" }, status=400)
    
    try: 
        item = Carditem.objects.get(id=item_id)
        if int(quantity) < 1 : 
            item.delete()
            return Response({"error" : "quantity must be atleast 1" }, status=400)

        item.quantity = quantity
        item.save()
        serillizer = CardItemSerializer(item)
        return Response(serillizer.data)

    except Carditem.DoesNotExist : 
        return Response({"error" : "Card item not find"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def order_create(request): 
    try: 
        data = request.data
        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')   
        payment_method = data.get('payment_method', 'cod')

        #  valiate phone number 

        # if phone.isdigit() or len(phone) <= 10 :
        #     return Response({"error": "Invalid phone number"}, status=400)

        card, created = Card.objects.get_or_create(user= request.user) 

        if not card.items.exists():
            return Response({"error": "Card is empty"}, status=400) 
        
        total_price = sum(item.product.price * item.quantity for item in card.items.all())

        # Create the order 
        order = Order.objects.create( 
            user=request.user,
            total_amount=total_price
        )

        # Create order items 
        for item in card.items.all(): 
            order_item = OrderItem.objects.create( 
                order = order,
                product = item.product,
                quantity = item.quantity,
                price = item.product.price
            )

        # Clear the card after creating the order
        card.items.all().delete() 
        return Response({"message": "Order created successfully"},status=201)
    
    except Exception as e:
        return Response({"error": str(e)},status=500)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data) 
    if serializer.is_valid() : 
        user = serializer.save()
        return Response({"message" : "User registered successfully", "user": UserSerializer(user).data}, status=201)
    return Response(serializer.errors, status=400)