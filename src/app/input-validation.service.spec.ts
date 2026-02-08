import { TestBed } from '@angular/core/testing';

import { InputValidationService } from './input-validation.service';

describe('InputValidationService', () => {
  let service: InputValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate a correct name', () => {
    const result = service.validateFriendName('John Doe');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should reject empty name', () => {
    const result = service.validateFriendName('');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('should reject name with only spaces', () => {
    const result = service.validateFriendName('   ');
    expect(result.isValid).toBe(false);
  });

  it('should reject name exceeding maximum length', () => {
    const longName = 'a'.repeat(101);
    const result = service.validateFriendName(longName);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('maximum length');
  });

  it('should reject name with invalid characters', () => {
    const result = service.validateFriendName('John<script>alert(1)</script>');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('invalid characters');
  });

  it('should accept name with apostrophe', () => {
    const result = service.validateFriendName('O\'Brien');
    expect(result.isValid).toBe(true);
  });

  it('should accept name with hyphen', () => {
    const result = service.validateFriendName('Mary-Jane');
    expect(result.isValid).toBe(true);
  });

  it('should return validated name when valid', () => {
    const name = service.getValidatedName('  John Doe  ');
    expect(name).toBe('John Doe');
  });

  it('should return null when invalid', () => {
    const name = service.getValidatedName('John<script>');
    expect(name).toBeNull();
  });
});
