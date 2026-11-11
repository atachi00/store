import './CreateProduct.css'
import {useState, useRef, useEffect} from 'react'
import api from '../../api/_axios'
import {useNavigate} from 'react-router-dom'
import { getErrorMessage } from '../../utils/getErrorMessage'
import Header from '../../shared/Header/Header'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 4 * 1024 * 1024 

function CreateProduct() { 
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [sku, setSku] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [image, setImage] = useState(null) // { file, url } или null
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)
  const imageRef = useRef(null)
  const navigate = useNavigate()

  // храним актуальную картинку, чтобы очистить превью при выходе со страницы
  useEffect(() => {
    imageRef.current = image
  }, [image])

  useEffect(() => {
    return () => {
      if (imageRef.current) URL.revokeObjectURL(imageRef.current.url)
    }
  }, [])

  const addFile = (fileList) => {
    const file = fileList[0]
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(`Файл «${file.name}» не подходит: только JPEG, PNG, WEBP`)
      return
    }
    if (file.size > MAX_SIZE) {
      setError(`Файл «${file.name}» больше 4 МБ`)
      return
    }

    if (image) URL.revokeObjectURL(image.url) // убираем старое превью
    setError('')
    setImage({ file, url: URL.createObjectURL(file) })
  }

  const removeImage = () => {
    if (image) URL.revokeObjectURL(image.url)
    setImage(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault() // без этого drop не сработает
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    if (e.currentTarget.contains(e.relatedTarget)) return // курсор ушёл на дочерний элемент
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    addFile(e.dataTransfer.files)
  }

  const handleInputChange = (e) => {
    addFile(e.target.files)
    e.target.value = '' // чтобы можно было выбрать тот же файл снова
  }

  const handleClick = async () => {
    if (!name.trim()) {
      setError('Название товара обязательно')
      return
    }

    if (name.trim().length < 4) {
      setError('Название товара должно быть не меньше 4 символов')
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

    if (!/^05[0-9a-fA-F]{64}$/.test(sessionId.trim())) {
      setError('Session ID должен начинаться с 05 и содержать 66 символов')
      return
    }

    setError('')
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('quantity', quantity)
      formData.append('price', price)
      formData.append('sku', sku)
      formData.append('session_id', sessionId.trim())
      if (image) formData.append('image', image.file)

      // токен подставляет interceptor в api/_axios.js
      await api.post('/create', formData)

      navigate('/seller')
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось создать товар. Проверьте данные.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
    <Header />
    <main className="page page-narrow">
    <div className="create-product-page">
      <h1 className="page-title">Создание товара</h1>

      <div className="form-card">

        {error && (
          <div className="form-error">
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
              className="input"
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
              <span className="field-required">*</span>
            </div>
            <textarea
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишите товар"
            />
            <p className="field-hint">Подробные характеристики, преимущества и комплектация</p>
          </div>
        </div>

        <div className="form-section">
          <p className="section-title">Параметры и стоимость</p>
          <div className="section-divider" />

          <div className="form-row">
            <div className="form-field">
              <div className="field-label-row">
                <span className="field-label">Категория</span>
                <span className="field-required">*</span>
              </div>
              <select
                className="input"
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

            <div className="form-field">
              <div className="field-label-row">
                <span className="field-label">Количество на складе</span>
                <span className="field-required">*</span>
              </div>
              <input
                className="input"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <div className="field-label-row">
                <span className="field-label">Цена продажи</span>
                <span className="field-required">*</span>
              </div>
              <input
                className="input"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="form-field">
              <div className="field-label-row">
                <span className="field-label">Артикул / SKU</span>
                <span className="field-required">*</span>
              </div>
              <input
                className="input"
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Например: ART-904812"
              />
            </div>
          </div>

          <div className="form-field">
            <div className="field-label-row">
              <span className="field-label">Session ID</span>
              <span className="field-required">*</span>
            </div>
            <input
              className="input"
              type="text"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="05..."
              spellCheck="false"
              autoComplete="off"
            />
            <p className="field-hint">Контакт для связи с покупателем</p>
          </div>
        </div>

        <div className="form-section">
          <p className="section-title">Медиафайлы</p>
          <div className="section-divider" />

          <div
            className={`upload-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={handleInputChange}
            />

            <div className="upload-icon-wrapper">
              <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5" />
                <path d="M12 12v8m0-8-3 3m3-3 3 3" />
              </svg>
            </div>
            <div className="upload-text-block">
              <span className="upload-title">Загрузите изображение товара</span>
              <p className="upload-subtitle">
                <span className="upload-subtitle-gray">Перетащите файл сюда или </span>
                <span className="upload-subtitle-accent">выберите на компьютере</span>
              </p>
            </div>
            <p className="upload-hint">
              Поддерживаются форматы JPEG, PNG, WEBP. Максимальный размер файла — 4 МБ.
            </p>
          </div>

          {image && (
            <div className="preview-list">
              <div className="preview-item">
                <img src={image.url} alt={image.file.name} className="preview-img" />
                <button type="button" className="preview-remove" onClick={removeImage}>
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="section-divider" />

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate('/seller')}>
            Отменить
          </button>
          <button type="button" className="btn btn-primary" onClick={handleClick} disabled={submitting}>
            {submitting ? 'Сохранение...' : 'Сохранить товар'}
          </button>
        </div>
      </div>
    </div>
    </main>
    </>
  )
}

export default CreateProduct