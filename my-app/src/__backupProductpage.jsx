
import { useParams } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import {getProductsById} from './api/sellerPage'
export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {

    let isMounted = true;
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getProductsById(id);
        
        if (isMounted) {
          setProduct(data);
          console.log('Product loaded:', data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          console.log('Error:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!product) return <div>Товар не найден</div>;
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Цена: {product.price} ₽</p>
      <button>В корзину</button>
    </div>
  );
}