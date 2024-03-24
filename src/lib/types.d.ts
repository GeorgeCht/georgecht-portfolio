type AsProp<T extends ElementType> = {
  as?: T
}

type PropsToOmit<T extends ElementType, P> = keyof (AsProp<T> & P)

type PolymorphicComponentProp<
  T extends ElementType,
  Props = {},
> = PropsWithChildren<Props & AsProp<T>> &
  Omit<ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>

// eslint-disable-next-line no-unused-vars
type PolymorphicComponentPropWithRef<
  T extends ElementType,
  Props = {},
> = PolymorphicComponentProp<T, Props> & { ref?: PolymorphicRef<T> }

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

// eslint-disable-next-line no-unused-vars
type TypeVariantClass =
  | 'type-xs'
  | 'type-xs-bold'
  | 'type-sm'
  | 'type-sm-bold'
  | 'type-base'
  | 'type-lg'
  | 'type-action'
  | 'type-mono'
  | 'type-mono-xs'

// eslint-disable-next-line no-unused-vars
type SplitOptions = 'chars' | 'words'

// eslint-disable-next-line no-unused-vars
interface SplitTextWrapperProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  children: string | React.ReactNode
  className?: string
}
