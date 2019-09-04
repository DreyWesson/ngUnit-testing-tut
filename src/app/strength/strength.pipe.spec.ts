import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it ('should display WEAK if strength is 5', () => {
    // tslint:disable-next-line: prefer-const
    let pipe = new StrengthPipe();

    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it ('should display STRONG if strength is 10', () => {
    // tslint:disable-next-line: prefer-const
    let pipe = new StrengthPipe();

    expect(pipe.transform(10)).toEqual('10 (strong)');
  });
});
