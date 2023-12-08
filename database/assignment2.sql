-- Insert into table `account`
INSERT INTO public.account(account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Update for table `account`
UPDATE public.account
SET  account_type = 'Admin'
WHERE account_id = 1;

-- Delete record in table `account`
DELETE FROM public.account
WHERE account_id = 1;

-- Update for table `inventory`
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE inv_id = 10;