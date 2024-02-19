import { screen } from 'node_modules/@storybook/testing-library/dist/index';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className props가 잘 전달된다.', async () => {
  // Arrange - 테스트를 위한 환경 구성하기
  await render(<TextField className="my-class" />);

  // Act - 테스트 할 동작 발생
  screen.debug();

  // Assert - 올바른 동작이 실행되었는지 검증
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );
});

it('className prop으로 설정한 class가 적용된다.', async () => {
  // Arrange - 테스트를 위한 환경 구성하기
  await render(<TextField className="my-class" />);

  // Act - 테스트 할 동작 발생
  // screen.debug();

  // Assert - 올바른 동작이 실행되었는지 검증
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출 된다.', async () => {
    // Arrange - 테스트를 위한 환경 구성하기
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // Act - 테스트 할 동작 발생

    // Assert - 올바른 동작이 실행되었는지 검증
    expect(textInput).toBeInTheDocument();
  });

  it('placeholder prop에 따라 placeholder가 변경 된다.', async () => {
    // Arrange - 테스트를 위한 환경 구성하기
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    // Act - 테스트 할 동작 발생

    // Assert - 올바른 동작이 실행되었는지 검증
    expect(textInput).toBeInTheDocument();
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test2');

  expect(spy).toHaveBeenCalledWith('test');
});

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test{Enter}');

  expect(spy).toHaveBeenCalledWith('test');
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onFocus={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(spy).toHaveBeenCalled();
});

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: 2,
    borderColor: 'rgb(25, 118, 210)',
  });
});
