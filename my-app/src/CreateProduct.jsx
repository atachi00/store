import './CreateProduct.css'

function CreateProduct() {
  return (
    <div className="create-product-page">
      <div className="page-header">
        <div className="breadcrumbs">
          <span className="breadcrumb-text">Каталог</span>
          <div className="breadcrumb-icon-wrapper">
            <img src="https://picsum.photos/id/14/14" alt="chevron-right" className="breadcrumb-icon" />
          </div>
          <span className="breadcrumb-text">Товары</span>
          <div className="breadcrumb-icon-wrapper">
            <img src="https://picsum.photos/id/14/14" alt="chevron-right" className="breadcrumb-icon" />
          </div>
          <span className="breadcrumb-current">Создание товара</span>
        </div>
        <p className="page-title">Создание товара</p>
      </div>

      <div className="form-card">

        <div className="form-section">
          <p className="section-title">Основная информация</p>
          <div className="section-divider" />

          <div className="form-field">
            <div className="field-label-row">
              <span className="field-label">Название товара</span>
              <span className="field-required">*</span>
            </div>
            <div className="field-box">
              <p className="field-placeholder">
                Введите точное название товара, например: Смартфон X-Pro 128ГБ
              </p>
            </div>
          </div>

          <div className="form-field">
            <div className="field-label-row">
              <span className="field-label">Описание товара</span>
            </div>
            <div className="field-box field-box-textarea">
              <p className="field-placeholder">Добавьте детальное описание вашего продукта...</p>
            </div>
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
              <div className="field-box field-box-between">
                <p className="field-placeholder">Выберите категорию товара</p>
                <div className="field-icon-wrapper">
                  <img src="https://picsum.photos/id/18/18" alt="chevron-down" className="field-icon" />
                </div>
              </div>
            </div>

            <div className="form-field form-field-flex">
              <div className="field-label-row">
                <span className="field-label">Количество на складе</span>
                <span className="field-required">*</span>
              </div>
              <div className="field-box field-box-between">
                <p className="field-placeholder">0</p>
                <span className="field-suffix">шт.</span>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field form-field-flex">
              <div className="field-label-row">
                <span className="field-label">Цена продажи</span>
                <span className="field-required">*</span>
              </div>
              <div className="field-box field-box-between">
                <p className="field-placeholder">0.00</p>
                <span className="field-suffix field-suffix-bold">₽</span>
              </div>
            </div>

            <div className="form-field form-field-flex">
              <div className="field-label-row">
                <span className="field-label">Артикул / SKU</span>
              </div>
              <div className="field-box">
                <p className="field-placeholder">Например: ART-904812</p>
              </div>
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
            <span>Отменить</span>
          </div>
          <div className="btn-submit">
            <span>Сохранить товар</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
