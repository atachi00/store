INSERT INTO categories (name, slug) VALUES
  ('Электроника', 'electronics'),
  ('Одежда', 'clothing'),
  ('Дом и сад', 'home-garden'),
  ('Красота и здоровье', 'beauty-health'),
  ('Спорт и отдых', 'sport-leisure'),
  ('Аудио', 'audio')
ON CONFLICT (slug) DO NOTHING;