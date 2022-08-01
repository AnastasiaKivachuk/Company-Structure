import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '@helpers/localStorage.helpers';

describe('LocalStorage util', () => {
  const nameField = 'testField';
  const testData = 'test';

  it('setLocalStorageItem', () => {
    setLocalStorageItem(nameField, 'test');
    const res = getLocalStorageItem(nameField);
    expect(res).toBe(testData);
  });

  it('removeLocalStorageItem', () => {
    removeLocalStorageItem(nameField);
    const res = getLocalStorageItem(nameField);
    expect(res).toBeNull();
  });
});
