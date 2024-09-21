import { ComponentProps, ComponentType, Suspense } from 'react';

export const Loader =
  (Component: ComponentType<any>) =>
  (props: ComponentProps<typeof Component>) =>
    (
      <Suspense fallback={<h1>Carregando</h1>}>
        <Component {...props} />
      </Suspense>
    );
