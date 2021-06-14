import { IsSignedInGuard } from './is-signed-in-guard';

describe('IsSignedInGuard', () => {
  it('should create an instance', () => {
    expect(new IsSignedInGuard()).toBeTruthy();
  });
});
