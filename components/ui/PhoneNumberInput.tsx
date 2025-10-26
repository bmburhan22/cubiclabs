import { forwardRef } from 'react';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

// Get flag emoji from country code
const getCountryFlag = (countryCode: string): string => {
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🏳️'; // Fallback flag emoji
  }
};

// Get all countries with their calling codes, sorted with popular ones first
const getCountryCodes = () => {
  const countries = getCountries();
  const popularCountries = ['KW', 'US', 'AE', 'SA', 'QA', 'BH', 'OM', 'GB', 'FR', 'DE', 'IT', 'ES', 'CN', 'IN', 'JP', 'KR'];
  
  const popularCodes = popularCountries.map(code => {
    const callingCode = getCountryCallingCode(code);
    return {
      code: callingCode,
      country: code,
      name: new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code,
      flag: getCountryFlag(code),
      displayCode: `+${callingCode}`,
    };
  });
  
  const otherCodes = countries
    .filter(code => !popularCountries.includes(code))
    .map(code => {
      const callingCode = getCountryCallingCode(code);
      return {
        code: callingCode,
        country: code,
        name: new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code,
        flag: getCountryFlag(code),
        displayCode: `+${callingCode}`,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  
  return [...popularCodes, ...otherCodes];
};

  const countryCodes = getCountryCodes();

interface PhoneNumberInputProps {
  id?: string;
  countryCodeValue?: string;
  phoneValue?: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  (
    {
      id,
      countryCodeValue,
      phoneValue,
      onCountryCodeChange,
      onPhoneChange,
      placeholder = '123456789',
      className = '',
      required = false,
    },
    ref
  ) => {
    // Determine if this is a smaller form (e.g., job application sidebar)
    const isSmallForm = className.includes('text-sm');
    
    return (
      <div className={`flex ${isSmallForm ? 'gap-1' : 'gap-2'} ${className}`}>
        {/* Country Code */}
        <select
          value={countryCodeValue}
          onChange={(e) => onCountryCodeChange(e.target.value)}
          className={`${isSmallForm ? 'w-40 px-2 py-2 text-sm' : 'w-52 px-3 py-3'} rounded-lg glass border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors text-white`}
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}
          required={required}
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.displayCode}>
              {country.displayCode}
            </option>
          ))}
        </select>
        {/* Phone Number */}
        <input
          ref={ref}
          type="tel"
          id={id}
          value={phoneValue}
          onChange={(e) => onPhoneChange(e.target.value)}
          className={`flex-1 ${isSmallForm ? 'px-3 py-2 text-sm' : 'px-4 py-3'} rounded-lg glass border border-white/10 focus:border-cyber-blue focus:outline-none transition-colors text-white`}
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  }
);

PhoneNumberInput.displayName = 'PhoneNumberInput';

export default PhoneNumberInput;

