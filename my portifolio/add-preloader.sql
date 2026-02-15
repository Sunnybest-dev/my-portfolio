-- Add preloader_text field to home_content
ALTER TABLE home_content ADD COLUMN preloader_text TEXT;

-- Update existing row with default value
UPDATE home_content SET preloader_text = 'SUNDAY DANIEL ANIEDEH' WHERE id = 1;
