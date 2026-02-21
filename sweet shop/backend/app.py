from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, Float, Text, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
import datetime

# Simple Flask + SQLite backend for Sweet Paradise
app = Flask(__name__)
CORS(app)

engine = create_engine('sqlite:///sweetshop.db', echo=False, future=True)
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(200), nullable=True)
    customer_email = Column(String(200), nullable=True)
    customer_phone = Column(String(50), nullable=True)
    total = Column(Float, nullable=False)
    created_at = Column(String(100), default=str(datetime.datetime.utcnow()))
    items = relationship('OrderItem', back_populates='order', cascade='all, delete')

class OrderItem(Base):
    __tablename__ = 'order_items'
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.id'))
    name = Column(String(300))
    price = Column(Float)
    quantity = Column(Integer)
    order = relationship('Order', back_populates='items')


class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(300), nullable=False)
    price = Column(Float, nullable=False)
    originalPrice = Column(Float, nullable=True)
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    image = Column(String(1000), nullable=True)
    rating = Column(Float, nullable=True)

Base.metadata.create_all(bind=engine)

# Sample products - Indian Sweets (mirror frontend)
SAMPLE_PRODUCTS = [
    {
        'name': 'Mysore Pak',
        'price': 299,
        'originalPrice': 399,
        'category': 'sweets',
        'description': 'Traditional Mysore Pak - gram flour, ghee & jaggery',
        'image': '/assets/images/mysore_pak.svg',
        'rating': 5
    },
    {
        'name': 'Kaju Katli',
        'price': 349,
        'originalPrice': 449,
        'category': 'sweets',
        'description': 'Premium cashew fudge with traditional taste',
        'image': '/assets/images/kaju_katli.svg',
        'rating': 5
    },
    {
        'name': 'Gulab Jamun',
        'price': 199,
        'category': 'sweets',
        'description': 'Soft milk solids in sugar syrup - 500g',
        'image': '/assets/images/gulab_jamun.svg',
        'rating': 4.5
    },
    {
        'name': 'Chikhalwali Chikni',
        'price': 249,
        'originalPrice': 329,
        'category': 'sweets',
        'description': 'Handmade chikhalwali laddu with finest dry fruits',
        'image': '/assets/images/chikhalwali.svg',
        'rating': 5
    },
    {
        'name': 'Premium Dry Fruits Mix',
        'price': 399,
        'category': 'dryfruits',
        'description': 'Almonds, cashews, pistachios - 250g premium blend',
        'image': '/assets/images/dry_fruit_mix.svg',
        'rating': 4.5
    },
    {
        'name': 'Jaggery Sweet Barfi',
        'price': 179,
        'category': 'sweets',
        'description': 'Pure jaggery with ghee - health conscious choice',
        'image': '/assets/images/jaggery_sweet.svg',
        'rating': 5
    },
    {
        'name': 'Rasmalai',
        'price': 279,
        'category': 'sweets',
        'description': 'Soft cheese dumplings in creamy malai - 500g',
        'image': '/assets/images/rasmalai.svg',
        'rating': 4.5
    },
    {
        'name': 'Badam Barfi',
        'price': 329,
        'category': 'sweets',
        'description': 'Almond fudge with premium almonds and ghee',
        'image': '/assets/images/badam_barfi.svg',
        'rating': 5
    },
    {
        'name': 'Kheer Pak',
        'price': 259,
        'originalPrice': 329,
        'category': 'sweets',
        'description': 'Rice pudding fudge - traditional royal recipe',
        'image': '/assets/images/kheer.svg',
        'rating': 5
    },
    {
        'name': 'Traditional Jalebi',
        'price': 149,
        'category': 'snacks',
        'description': 'Crispy spiral sweets in sugar syrup - 250g',
        'image': '/assets/images/jalebi.svg',
        'rating': 4.5
    },
    {
        'name': 'Gujhiya Mix Pack',
        'price': 399,
        'category': 'sweets',
        'description': 'Assorted gujhiya with dry fruits - festival special',
        'image': '/assets/images/gujhiya.svg',
        'rating': 5
    },
    {
        'name': 'Peda Assortment',
        'price': 279,
        'category': 'sweets',
        'description': 'Mixed pedhas - Desi ghee, malai, chocolate - 300g',
        'image': '/assets/images/peda.svg',
        'rating': 5
    }
]

@app.route('/api/products', methods=['GET'])
def get_products():
    session = SessionLocal()
    try:
        prods = session.query(Product).all()
        if not prods:
            # populate sample products
            for p in SAMPLE_PRODUCTS:
                prod = Product(
                    name=p['name'], price=p['price'], originalPrice=p.get('originalPrice'),
                    category=p.get('category'), description=p.get('description'), image=p.get('image'), rating=p.get('rating')
                )
                session.add(prod)
            session.commit()
            prods = session.query(Product).all()

        result = []
        for p in prods:
            result.append({
                'id': p.id,
                'name': p.name,
                'price': p.price,
                'originalPrice': p.originalPrice,
                'category': p.category,
                'description': p.description,
                'image': p.image,
                'rating': p.rating
            })
        return jsonify({'products': result})
    finally:
        session.close()


@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.get_json()
    session = SessionLocal()
    try:
        prod = Product(
            name=data.get('name'), price=float(data.get('price', 0)), originalPrice=data.get('originalPrice'),
            category=data.get('category'), description=data.get('description'), image=data.get('image'), rating=data.get('rating')
        )
        session.add(prod)
        session.commit()
        return jsonify({'message': 'Product created', 'id': prod.id}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()


@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    session = SessionLocal()
    try:
        prod = session.get(Product, product_id)
        if not prod:
            return jsonify({'error': 'Not found'}), 404
        prod.name = data.get('name', prod.name)
        prod.price = float(data.get('price', prod.price))
        prod.originalPrice = data.get('originalPrice', prod.originalPrice)
        prod.category = data.get('category', prod.category)
        prod.description = data.get('description', prod.description)
        prod.image = data.get('image', prod.image)
        prod.rating = data.get('rating', prod.rating)
        session.commit()
        return jsonify({'message': 'Updated'})
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()


@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    session = SessionLocal()
    try:
        prod = session.get(Product, product_id)
        if not prod:
            return jsonify({'error': 'Not found'}), 404
        session.delete(prod)
        session.commit()
        return jsonify({'message': 'Deleted'})
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

@app.route('/api/order', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data or 'items' not in data:
        return jsonify({'error': 'Invalid payload'}), 400

    session = SessionLocal()
    try:
        total = float(data.get('total', 0))
        order = Order(
            customer_name=data.get('customer_name'),
            customer_email=data.get('customer_email'),
            customer_phone=data.get('customer_phone'),
            total=total
        )
        session.add(order)
        session.flush()
        for it in data['items']:
            item = OrderItem(order_id=order.id, name=it.get('name'), price=float(it.get('price',0)), quantity=int(it.get('quantity',1)))
            session.add(item)
        session.commit()
        # In production send email or SMS here
        return jsonify({'message': 'Order received', 'order_id': order.id}), 201
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

if __name__ == '__main__':
    app.run(debug=True)
