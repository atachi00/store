import './CreateProduct.css'
import {useState} from 'react'
import api from '../../api/_axios'
import {useNavigate} from 'react-router-dom'

function CreateProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [sku, setSku] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleClick = async () => {
    if (!name.trim()) {
      setError('Название товара обязательно')
      return
    }

    if (name.trim().length < 10) {
      setError('Название товара должно быть не меньше 10 символов')
      return
    }

    if (!description.trim()) {
      setError('Описание товара обязательно')
      return
    }

    if (!category) {
      setError('Выберите категорию')
      return
    }

    if (!quantity || Number(quantity) <= 0) {
      setError('Количество на складе должно быть больше 0')
      return
    }

    if (!price || Number(price) <= 0) {
      setError('Цена должна быть больше 0')
      return
    }

    if (!sku.trim()) {
      setError('Артикул обязателен')
      return
    }

    try {
      await api.post('/create', {
        name,
        description,
        category,
        quantity,
        price,
        sku
      }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      navigate('/seller')
    } catch (err) {
      setError('Не удалось создать товар. Проверьте данные.')
      if (err.status === 500) {
        navigate('/forbidden')
      }
    }
  }

  return (
    <div className="create-product-page">
      <div className="page-header">
        <p className="page-title">Создание товара</p>
      </div>

      <div className="form-card">

        {error && (
          <div className="validation-error">
            {error}
          </div>
        )}

        <div className="form-section">
          <p className="section-title">Основная информация</p>
          <div className="section-divider" />

          <div className="form-field">
            <div className="field-label-row">
              <span className="field-label">Название товара</span>
              <span className="field-required">*</span>
            </div>
            <input 
              maxLength="80"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название товара"
              type="text"
              required
            /> 
          </div>

          <div className="form-field">
            <div className="field-label-row">
              <span className="field-label">Описание товара</span>
            </div>
            <textarea 
              className="input-box field-box-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Подробные характеристики, преимущества и комплектация"
            />
            <p className="field-hint">Подробные характеристики, преимущества и комплектация</p>
          </div>
        </div>

        <div className="form-section">
          <p className="section-title">Параметры и стоимость</p>
          <div className="section-divider" />

          <div className="form-row">
            <div className="form-field form-field-flex">
              <div className="field-label-row">
                <span className="field-label">Категория</span>
                <span className="field-required">*</span>
              </div>
              <select 
                className="input-box"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Выберите категорию</option>
                <option value="1">Электроника</option>
                <option value="2">Одежда</option>
                <option value="3">Дом и сад</option>
                <option value="4">Красота и здоровье</option>
                <option value="5">Спорт и отдых</option>
                <option value="6">Аудио</option>
              </select>
            </div>

            <div className="form-field form-field-flex">
              <div className="field-label-row">
                <span className="field-label">Количество на складе</span>
                <span className="field-required">*</span>
              </div>
              <input 
                className="input-box"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field form-field-flex">
              <div className="field-label-row">
                <span className="field-label">Цена продажи</span>
                <span className="field-required">*</span>
              </div>
              <input 
                
                className="input-box"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="form-field form-field-flex">
              <div className="field-label-row">
                <span className="field-label">Артикул / SKU</span>
              </div>
              <input 
                className="input-box"
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Например: ART-904812"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <p className="section-title">Медиафайлы</p>
          <div className="section-divider" />

          <div className="upload-zone">
            <div className="upload-icon-wrapper">
              <img src="https://picsum.photos/id/24/24" alt="upload-cloud" className="upload-icon" />
            </div>
            <div className="upload-text-block">
              <span className="upload-title">Загрузите изображения товара</span>
              <p className="upload-subtitle">
                <span className="upload-subtitle-gray">Перетащите файлы сюда или </span>
                <span className="upload-subtitle-accent">выберите на компьютере</span>
              </p>
            </div>
            <p className="upload-hint">
              Поддерживаются форматы JPEG, PNG, WEBP. Максимальный размер файла — 10 МБ.
            </p>
          </div>
        </div>

        <div className="section-divider" />

        <div className="form-actions">
          <div className="btn-cancel">
            <button onClick={() => navigate('/seller')}>Отменить</button>
          </div>
          <div className="btn-submit">
            <button onClick={() => {handleClick()}}>Сохранить товар</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct