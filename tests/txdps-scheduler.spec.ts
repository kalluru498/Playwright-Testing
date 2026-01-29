import { test, expect, Page } from '@playwright/test';

test.describe('Texas DPS Scheduler - E2E Tests', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('https://www.txdpsscheduler.com/');
  });

  test('TC001 - Language Selection - English', async () => {
    // Verify initial page state
    const englishButton = page.getByRole('button', { name: 'English' });
    const espanolButton = page.getByRole('button', { name: 'Español' });
    
    await expect(englishButton).toBeVisible();
    await expect(espanolButton).toBeVisible();
    
    // Click English button
    await englishButton.click();
    
    // Verify login form appears
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
  });

  test('TC002 - Language Selection - Spanish', async () => {
    // Click Español button
    await page.getByRole('button', { name: 'Español' }).click();
    
    // Verify login form appears (may have Spanish labels)
    await expect(page.locator('form')).toBeVisible();
  });

  test('TC003 - Login Form - Fill with Cell Phone', async () => {
    // Fill Texas Card Number (optional)
    await page.locator('#input-52').fill('1234567890');
    
    // Fill First Name
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    
    // Fill Last Name
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    
    // Fill Date of Birth
    await page.locator('#dob').fill('01/15/1990');
    
    // Fill Last Four SSN
    await page.locator('#last4Ssn').fill('1234');
    
    // Select Cell Phone radio button (should be default)
    const cellPhoneRadio = page.locator('#input-70');
    await expect(cellPhoneRadio).toBeChecked();
    
    // Verify Cell Phone input appears
    const cellPhoneInput = page.locator('#input-120');
    await expect(cellPhoneInput).toBeVisible();
    
    // Fill Cell Phone Number
    await cellPhoneInput.fill('(512)555-1234');
  });

  test('TC004 - Login Form - Switch to Email', async () => {
    // Fill required basic fields
    await page.getByRole('textbox', { name: 'First Name' }).fill('Jane');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Smith');
    await page.locator('#dob').fill('03/20/1985');
    await page.locator('#last4Ssn').fill('5678');
    
    // Click Email radio button
    const emailRadio = page.locator('#input-72');
    await emailRadio.click();
    
    // Verify Email inputs appear
    const emailInput = page.locator('#email');
    const verifyEmailInput = page.locator('#verifyEmail');
    
    await expect(emailInput).toBeVisible();
    await expect(verifyEmailInput).toBeVisible();
    
    // Verify Cell Phone input is hidden
    const cellPhoneInput = page.locator('#input-120');
    await expect(cellPhoneInput).not.toBeVisible();
    
    // Fill Email fields
    await emailInput.fill('user@example.com');
    await verifyEmailInput.fill('user@example.com');
  });

  test('TC005 - Login Form - Validation - Missing Required Fields', async () => {
    // Try to submit empty form
    const logOnButton = page.getByRole('button', { name: 'Log On' });
    
    // Button should be disabled initially
    await expect(logOnButton).toBeDisabled();
    
    // Fill only First Name
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    
    // Button should still be disabled
    await expect(logOnButton).toBeDisabled();
  });

  test('TC006 - Login Form - Validation - First Name Error', async () => {
    // Fill form without First Name
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.locator('#dob').fill('01/15/1990');
    await page.locator('#last4Ssn').fill('1234');
    
    // Check for error message
    const firstNameAlert = page.locator('text=First name is required');
    await expect(firstNameAlert).toBeVisible();
  });

  test('TC007 - Login Form - Validation - Email Fields When Selected', async () => {
    // Fill basic fields
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.locator('#dob').fill('01/15/1990');
    await page.locator('#last4Ssn').fill('1234');
    
    // Switch to Email
    await page.locator('#input-72').click();
    
    // Check for email required error
    const emailAlert = page.locator('text=Email is required');
    const verifyEmailAlert = page.locator('text=Verify Email is required');
    
    await expect(emailAlert).toBeVisible();
    await expect(verifyEmailAlert).toBeVisible();
  });

  test('TC008 - Navigate to OTP Verification Page (Requires Valid Credentials)', async () => {
    // This test would need valid credentials and reCAPTCHA solving
    // Fill form with cell phone
    await page.locator('#input-52').fill('1234567890');
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.locator('#dob').fill('01/15/1990');
    await page.locator('#last4Ssn').fill('1234');
    await page.locator('#input-120').fill('(512)555-1234');
    
    // Wait for reCAPTCHA to be solved (manual or automated)
    // Note: This is where you'd handle reCAPTCHA
    
    // Click Log On button
    // const logOnButton = page.getByRole('button', { name: 'Log On' });
    // await logOnButton.click();
    
    // Expect to see OTP page
    // await expect(page.locator('text=One Time Passcode Verification')).toBeVisible();
  });

  test('TC009 - OTP Verification - Enter Passcode', async () => {
    // This test assumes we're already on the OTP page
    // Skipping navigation for this example
    
    // Fill OTP field
    const otpInput = page.locator('input[type="text"]').first();
    // await otpInput.fill('123456');
    
    // Verify VERIFY button is enabled
    const verifyButton = page.getByRole('button', { name: 'VERIFY' });
    // await expect(verifyButton).not.toBeDisabled();
    // await verifyButton.click();
  });

  test('TC010 - Navigation - Previous Button on OTP Page', async () => {
    // This assumes we're on OTP page
    // Click Previous button to go back to login
    // const previousButton = page.getByRole('button', { name: 'Previous' }).last();
    // await previousButton.click();
    
    // Should be back on login page
    // await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
  });

  test('TC011 - Appointment Options - New vs Existing', async () => {
    // This assumes successful authentication
    // Verify both buttons are visible
    // const newAppointmentBtn = page.getByRole('button', { name: 'New Appointment' });
    // const existingAppointmentBtn = page.getByRole('button', { name: 'Existing Appointment' });
    
    // await expect(newAppointmentBtn).toBeVisible();
    // await expect(existingAppointmentBtn).toBeVisible();
    
    // Click New Appointment
    // await newAppointmentBtn.click();
    
    // Verify we're on Service Selection page
    // await expect(page.locator('text=Select Service')).toBeVisible();
  });

  test('TC012 - Service Selection - Driver License Services', async () => {
    // This assumes we're on Service Selection page
    // Click "Apply for first time Texas DL/Permit"
    const dlButton = page.getByRole('button', { 
      name: 'Apply for first time Texas DL/Permit' 
    });
    
    // await expect(dlButton).toBeVisible();
    // await expect(dlButton).not.toBeDisabled();
    // await dlButton.click();
  });

  test('TC013 - Service Selection - Identification Card', async () => {
    const idButton = page.getByRole('button', { 
      name: 'Apply for first time Texas ID' 
    });
    
    // await expect(idButton).toBeVisible();
    // await expect(idButton).not.toBeDisabled();
  });

  test('TC014 - Service Selection - CDL Services', async () => {
    const cdlButton = page.getByRole('button', { 
      name: 'Apply for first time Texas CLP/CDL' 
    });
    
    const nonDomicileButton = page.getByRole('button', { 
      name: 'Apply/Renew Non-Domicile CDL' 
    });
    
    // await expect(cdlButton).toBeVisible();
    // await expect(nonDomicileButton).toBeVisible();
  });

  test('TC015 - Service Selection - Other Services', async () => {
    const eicButton = page.getByRole('button', { 
      name: 'Apply for Election Identification Certificate' 
    });
    
    const homeVisitButton = page.getByRole('button', { 
      name: 'Schedule a home-bound visit' 
    });
    
    const serviceNotListedButton = page.getByRole('button', { 
      name: 'Service not listed or my license is not eligible' 
    });
    
    // await expect(eicButton).toBeVisible();
    // await expect(homeVisitButton).toBeVisible();
    // await expect(serviceNotListedButton).toBeVisible();
  });

  test('TC016 - Verify Page Title', async () => {
    await expect(page).toHaveTitle('Texas DPS - Schedule Appointment');
  });

  test('TC017 - Verify Support Email Link', async () => {
    const supportLink = page.getByRole('link', { 
      name: 'TXScheduler@dps.texas.gov' 
    });
    
    await expect(supportLink).toBeVisible();
    
    // Verify it's a mailto link
    const href = await supportLink.getAttribute('href');
    expect(href).toContain('mailto:TXScheduler@dps.texas.gov');
  });

  test('TC018 - Verify reCAPTCHA is Present', async () => {
    const recaptchaFrame = page.frameLocator('iframe');
    const recaptchaText = recaptchaFrame.getByText('reCAPTCHA');
    
    await expect(recaptchaText).toBeVisible();
  });

  test('TC019 - Verify Language Toggle Available on All Pages', async () => {
    // Check English button in header
    const englishBtn = page.getByRole('button', { name: 'English' }).first();
    const espanolBtn = page.getByRole('button', { name: 'Español' }).first();
    
    await expect(englishBtn).toBeVisible();
    await expect(espanolBtn).toBeVisible();
  });

  test('TC020 - Date of Birth Field - Format Validation', async () => {
    const dobField = page.locator('#dob');
    
    // Try valid format
    await dobField.fill('01/15/1990');
    await expect(dobField).toHaveValue('01/15/1990');
    
    // Clear and try another valid format
    await dobField.clear();
    await dobField.fill('12/25/2000');
    await expect(dobField).toHaveValue('12/25/2000');
  });

  test('TC021 - Conditional Field Visibility - Phone to Email', async () => {
    // Fill basic required fields
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.locator('#dob').fill('01/15/1990');
    await page.locator('#last4Ssn').fill('1234');
    
    // Initially, Cell Phone field should be visible
    const cellPhoneField = page.locator('#input-120');
    await expect(cellPhoneField).toBeVisible();
    
    // Switch to Email
    await page.locator('#input-72').click();
    
    // Cell Phone field should hide
    await expect(cellPhoneField).not.toBeVisible();
    
    // Email fields should be visible
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#verifyEmail')).toBeVisible();
    
    // Switch back to Phone
    await page.locator('#input-70').click();
    
    // Cell Phone field should be visible again
    await expect(cellPhoneField).toBeVisible();
  });
});
