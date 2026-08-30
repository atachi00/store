import { useParams } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import {getProductsById} from './api/sellerPage'
import './ProductPage.css'
function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // ✅ Отменяем предыдущий запрос при размонтировании
    let isMounted = true;
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ✅ Загружаем конкретный товар по ID
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
    <div className="product-page">

      <div className="breadcrumbs">
        <div className="breadcrumb-item">
          <span className="breadcrumb-text">Редактировать карточку</span>
      </div></div>


      <div className="product-main">

        <div className="product-gallery">
          <img className="product-main-image" src="https://res.cloudinary.com/kzvgsyu7/image/upload/v1787921254/Silly_cars.jpg" alt="SoundPro X900" />
          <div className="product-thumbs">
            <img className="product-thumb" src="https://picsum.photos/id/133/100" alt="Thumb-0" />
            <img className="product-thumb" src="https://picsum.photos/id/133/100" alt="Thumb-1" />
            <img className="product-thumb" src="https://picsum.photos/id/133/100" alt="Thumb-2" />
            <img className="product-thumb" src="https://picsum.photos/id/133/100" alt="Thumb-3" />
          </div>
        </div>


        <div className="product-info">
          <div className="product-title-block">
            <p className="product-title">{product.name}</p>
            <div className="product-rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <img key={i} className="star-icon" src="https://picsum.photos/id/18/18" alt="star" />
                ))}
              </div>
              <span className="rating-value">4.5</span>
              <span className="reviews-count">128 отзывов</span>
              <div className="divider-vertical" />
              <span className="product-sku">Арт: SP-900-BLK</span>
            </div>
          </div>

          <div className="price-row">
            <span className="price-current">{product.price}</span>
            <span className="price-old">32 990 ₽</span>
            <div className="discount-badge">
              <span className="discount-text">-24%</span>
            </div>
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <div className="divider-horizontal" />

          <div className="options-block">
            <div className="option-group">
              <span className="option-label">ЦВЕТ: ЧЕРНЫЙ МАТОВЫЙ</span>
              <div className="color-options">
                <img className="color-swatch" src="https://picsum.photos/id/36/36" alt="Цвет 1" />
                <img className="color-swatch" src="https://picsum.photos/id/36/36" alt="Цвет 2" />
                <img className="color-swatch" src="https://picsum.photos/id/36/36" alt="Цвет 3" />
              </div>
            </div>

            <div className="option-group">
              <span className="option-label">РАЗМЕР АМБУШЮР</span>
              <div className="size-options">
                <div className="size-option">
                  <span className="size-text">S</span>
                </div>
                <div className="size-option size-option-active">
                  <span className="size-text size-text-active">M</span>
                </div>
                <div className="size-option">
                  <span className="size-text">L</span>
                </div>
              </div>
            </div>
          </div>

          <div className="divider-horizontal" />

          <div className="actions-row">
            <div className="quantity-control">
              <button className="quantity-btn">
                <img className="quantity-icon" src="https://picsum.photos/id/16/16" alt="minus" />
              </button>
              <span className="quantity-value">1</span>
              <button className="quantity-btn">
                <img className="quantity-icon" src="https://picsum.photos/id/16/16" alt="plus" />
              </button>
            </div>

            <button className="add-to-cart-btn">
              <img className="cart-icon" src="https://picsum.photos/id/20/20" alt="shopping-cart" />
              <span>Добавить в корзину</span>
            </button>

            <button className="favorite-btn">
              <img className="favorite-icon" src="https://picsum.photos/id/20/20" alt="heart" />
            </button>
          </div>

          <div className="info-box">
            <div className="info-row">
              <img className="info-icon" src="https://picsum.photos/id/18/18" alt="truck" />
              <p className="info-text">Бесплатная экспресс-доставка завтра в Москву</p>
            </div>
            <div className="info-row">
              <img className="info-icon" src="https://picsum.photos/id/18/18" alt="refresh-cw" />
              <p className="info-text">30 дней на простой возврат без лишних вопросов</p>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="tabs-section">
        <div className="tabs-header">
          <div className="tab tab-active">
            <span className="tab-text tab-text-active">Описание</span>
          </div>
          <div className="tab">
            <span className="tab-text">Характеристики</span>
          </div>
          <div className="tab">
            <span className="tab-text">Отзывы (128)</span>
          </div>
        </div>

        <div className="tab-content">
          <p className="tab-content-title">Новый уровень погружения в музыку</p>
          <p className="tab-content-text">
            SoundPro X900 объединяют в себе передовые аудиотехнологии и
            исключительный эргономичный дизайн. Оснащенные новейшими 40-мм
            динамиками с биоцеллюлозной диафрагмой, наушники обеспечивают
            студийное качество звука с глубокими, контролируемыми басами и
            кристально чистыми высокими частотами.
          </p>
          <p className="tab-content-text">
            Система адаптивного активного шумоподавления (ANC) анализирует
            окружающий шум 500 раз в секунду и мгновенно нейтрализует его,
            позволяя вам оставаться наедине со своей музыкой даже в самом шумном
            транспорте. Режим прозрачности поможет мгновенно вернуться к
            реальности одним касанием сенсорной панели.
          </p>
        </div>
      </div> */}


      {/* <div className="reviews-section">
        <p className="section-title">Отзывы покупателей</p>

        <div className="reviews-summary">
          <div className="reviews-score-block">
            <span className="reviews-score">4.5</span>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <img key={i} className="star-icon-small" src="https://picsum.photos/id/16/16" alt="star" />
              ))}
            </div>
            <span className="reviews-based-on">На основе 128 оценок</span>
          </div>

          <div className="divider-vertical-tall" />

          <div className="reviews-bars">
            {[
              { stars: 5, count: 94 },
              { stars: 4, count: 24 },
              { stars: 3, count: 8 },
              { stars: 2, count: 2 },
              { stars: 1, count: 0 },
            ].map((row) => (
              <div className="review-bar-row" key={row.stars}>
                <p className="review-bar-star-num">{row.stars}</p>
                <img className="star-icon-tiny" src="https://picsum.photos/id/12/12" alt="star" />
                <div className="review-bar-outer">
                  <img src="https://picsum.photos/id/180/6" alt="Bar-Outer" className="review-bar-fill" />
                </div>
                <p className="review-bar-count">{row.count}</p>
              </div>
            ))}
          </div>

          <div className="divider-vertical-tall" />

          <div className="write-review-block">
            <span className="write-review-title">Поделитесь своим опытом</span>
            <p className="write-review-text">
              Ваш отзыв поможет другим покупателям сделать правильный выбор
            </p>
            <button className="write-review-btn">
              <span>Написать отзыв</span>
            </button>
          </div>
        </div>

        <div className="reviews-list">
          {[
            {
              initial: 'А',
              name: 'Александр М.',
              date: '12 мая 2026',
              text: 'Шумоподавление просто фантастическое. Полностью гасит гул в метро. Звук ровный, детализированный, сцена очень широкая. На голове сидят идеально, уши не устают даже через 5 часов работы.',
              likes: 12,
              dislikes: 0,
            },
            {
              initial: 'Е',
              name: 'Елена К.',
              date: '28 апреля 2026',
              text: 'Звук великолепный, особенно понравились басы. Сборка качественная, тактильно материалы безумно приятные. Единственный минус лично для меня — в комплекте нет жесткого кейса, только мягкий чехол.',
              likes: 12,
              dislikes: 0,
            },
            {
              initial: 'Д',
              name: 'Дмитрий В.',
              date: '15 апреля 2026',
              text: 'Живут от одного заряда невероятно долго. Забыл когда заряжал в последний раз. Быстрая зарядка спасает: 10 минут у розетки дают почти 5 часов прослушивания. Качество микрофонов при звонках супер.',
              likes: 12,
              dislikes: 0,
            },
          ].map((review, i) => (
            <div className="review-card" key={i}>
              <div className="review-header">
                <div className="review-author">
                  <div className="review-avatar">
                    <span>{review.initial}</span>
                  </div>
                  <div className="review-author-info">
                    <span className="review-author-name">{review.name}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="stars">
                  {[...Array(5)].map((_, j) => (
                    <img key={j} className="star-icon-small" src="https://picsum.photos/id/14/14" alt="star" />
                  ))}
                </div>
              </div>

              <p className="review-text">{review.text}</p>

              <div className="review-actions">
                <span className="review-helpful-label">Полезно?</span>
                <button className="review-vote-btn">
                  <img className="vote-icon" src="https://picsum.photos/id/14/14" alt="thumbs-up" />
                  <span className="vote-text vote-text-active">Да ({review.likes})</span>
                </button>
                <button className="review-vote-btn">
                  <img className="vote-icon" src="https://picsum.photos/id/14/14" alt="thumbs-down" />
                  <span className="vote-text">Нет ({review.dislikes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}


      {/* <div className="recommended-section">
        <p className="section-title">Рекомендуемые товары</p>

        <div className="recommended-grid">
          {[
            { name: 'SoundPro X500 Lite', price: '12 990 ₽' },
            { name: 'SoundBuds Pro ANC', price: '9 990 ₽' },
            { name: 'SoundPro Studio Monitor', price: '19 990 ₽' },
            { name: 'Gaming Edge H700', price: '15 990 ₽' },
          ].map((item, i) => (
            <div className="recommended-card" key={i}>
              <img className="recommended-image" src="https://picsum.photos/273/180" alt={item.name} />
              <div className="recommended-info">
                <p className="recommended-name">{item.name}</p>
                <div className="stars">
                  {[...Array(5)].map((_, j) => (
                    <img key={j} className="star-icon-tiny" src="https://picsum.photos/id/12/12" alt="star" />
                  ))}
                </div>
                <span className="recommended-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="footer">
        <div className="footer-top">
          <span className="footer-logo">SOUNDPRO</span>
          <div className="footer-links">
            <span className="footer-link">О компании</span>
            <span className="footer-link">Доставка и оплата</span>
            <span className="footer-link">Гарантия</span>
            <span className="footer-link">Контакты</span>
            <span className="footer-link">Политика конфиденциальности</span>
          </div>
        </div>
        <span className="footer-copyright">© 2026 SOUNDPRO. Все права защищены.</span>
      </div> */}
    </div> 
  )
}

export default ProductPage
