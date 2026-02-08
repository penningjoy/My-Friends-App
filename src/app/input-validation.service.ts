import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  private readonly MAX_NAME_LENGTH = 100;
  private readonly NAME_PATTERN = /^[a-zA-Z0-9\s\-']+$/;

  constructor() { }

  /**
   * Validates a friend name input
   * @param name The name to validate
   * @returns An object with isValid flag and error message if invalid
   */
  validateFriendName(name: string): { isValid: boolean, error?: string } {
    if (!name || !name.trim()) {
      return { isValid: false, error: 'Name cannot be empty' };
    }

    const trimmedName = name.trim();

    // Check length
    if (trimmedName.length > this.MAX_NAME_LENGTH) {
      return {
        isValid: false,
        error: `Name exceeds maximum length of ${this.MAX_NAME_LENGTH} characters`
      };
    }

    // Check for valid characters
    if (!this.NAME_PATTERN.test(trimmedName)) {
      return {
        isValid: false,
        error: 'Name contains invalid characters. Only letters, numbers, spaces, hyphens, and apostrophes are allowed.'
      };
    }

    return { isValid: true };
  }

  /**
   * Gets the trimmed name if valid, null otherwise
   * @param name The name to validate and trim
   * @returns The trimmed name or null if invalid
   */
  getValidatedName(name: string): string | null {
    const validation = this.validateFriendName(name);
    if (!validation.isValid) {
      return null;
    }
    return name.trim();
  }
}
