import { describe, expect, it } from 'vitest';
import { accessCookieName, accessToken, hasAccess, isCorrectPassword } from '../../lib/case-study-access';
import { safeRedirectPath } from '../../components/utils/links';

const cookies = (value?: string) => ({ cookies: value === undefined ? {} : { [accessCookieName()]: value } });

describe('case study access', () => {
  it('checks the password', () => {
    expect(isCorrectPassword('secret', 'secret')).toBe(true);
    expect(isCorrectPassword('Secret', 'secret')).toBe(false);
    expect(isCorrectPassword('secret2', 'secret')).toBe(false);
    expect(isCorrectPassword(undefined, 'secret')).toBe(false);
    expect(isCorrectPassword('', '')).toBe(false);
    expect(isCorrectPassword('anything', undefined)).toBe(false);
  });

  it('accepts only the signed cookie for the current password', () => {
    const token = accessToken('secret')!;
    expect(hasAccess(cookies(token), 'secret')).toBe(true);
    expect(hasAccess(cookies('true'), 'secret')).toBe(false);
    expect(hasAccess(cookies(), 'secret')).toBe(false);
    // Changing the password signs everyone out.
    expect(hasAccess(cookies(token), 'new-secret')).toBe(false);
  });

  it('never grants access when no password is configured', () => {
    expect(accessToken('')).toBeNull();
    expect(hasAccess(cookies(''), '')).toBe(false);
    expect(hasAccess(cookies('true'), undefined)).toBe(false);
  });
});

describe('safeRedirectPath', () => {
  it('keeps same-site paths and drops everything else', () => {
    expect(safeRedirectPath('/articles/appsharing')).toBe('/articles/appsharing');
    expect(safeRedirectPath('https://evil.example')).toBe('/');
    expect(safeRedirectPath('//evil.example')).toBe('/');
    expect(safeRedirectPath('/\\evil.example')).toBe('/');
    expect(safeRedirectPath(['/a'])).toBe('/');
    expect(safeRedirectPath(undefined)).toBe('/');
  });
});
