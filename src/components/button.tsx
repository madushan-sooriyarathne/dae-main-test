import Link from "next/link";

import { cva } from "cva";
import { twMerge } from "tailwind-merge";

import type { VariantProps } from "cva";
import type { ReactNode } from "react";

const buttonVariants = cva(
  [
    "group/btn min-w-[8rem] min-h-[3rem] md:min-h-[3.25rem] flex flex-row items-center justify-center gap-1 py-3 px-3 border-solid text-xs leading-tight rounded-sm no-underline transition-[color,background-color,fill] ease-in-out duration-200 md:py-4 md:px-6 md:text-lg font-bold border-2",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-primary text-white border-primary border-2 fill-white hover:bg-transparent hover:text-primary hover:fill-primary focus-visible:outline focus-visible:outline-2 outline-primary outline-offset-2",
        ],
        secondary: [
          "bg-water text-white border-water border-2 fill-white hover:bg-transparent hover:text-water hover:fill-water focus-visible:outline focus-visible:outline-2 outline-water outline-offset-2",
        ],
        tertiary: [
          "bg-land text-white border-land border-2 fill-white hover:bg-transparent hover:text-land hover:fill-land focus-visible:outline focus-visible:outline-2 outline-land outline-offset-2",
        ],
        white: [
          "bg-white text-black border-white border-2 fill-black hover:bg-transparent hover:text-white hover:fill-white focus-visible:outline focus-visible:outline-2 outline-white outline-offset-2",
        ],
        black: [
          "bg-black text-white border-black border-2 fill-white hover:bg-transparent hover:text-black hover:fill-black focus-visible:outline focus-visible:outline-2 outline-black outline-offset-2",
        ],
      },
      outline: {
        true: "bg-transparent",
      },
      fullWidth: {
        true: "w-full",
      },
      small: {
        true: "py-1 px-2 [&>span:text-sm]",
      },
      disabled: {
        true: "bg-black-500 border-black-500 text-white fill-white cursor-not-allowed hover:bg-black-500 hover:border-black-500 hover:text-white hover:fill-white",
      },
      mobileAdapt: {
        true: "w-full sm:w-auto",
      },
      loading: {
        true: "",
      },
      solid: {
        true: "",
      },
    },
    compoundVariants: [
      // Outline Variants
      {
        intent: "primary",
        outline: true,

        className: [
          "text-primary border-primary fill-primary hover:bg-primary hover:text-white hover:fill-white",
          "[&>div]:border-[rgba(0,0,0,0.3)] [&>div]:border-l-primary [&>div]:hover:border-[rgba(255,255,255,0.3)] [&>div]:hover:border-l-white",
        ],
      },
      {
        intent: "secondary",
        outline: true,
        className: [
          "text-water border-water fill-water hover:bg-water hover:text-white hover:fill-white",
          "[&>div]:border-[rgba(0,0,0,0.3)] [&>div]:border-l-water [&>div]:hover:border-[rgba(255,255,255,0.3)] [&>div]:hover:border-l-white",
        ],
      },
      {
        intent: "tertiary",
        outline: true,
        className: [
          "text-land border-land fill-land hover:bg-land hover:text-white hover:fill-white",
          "[&>div]:border-[rgba(0,0,0,0.3)] [&>div]:border-l-land [&>div]:hover:border-[rgba(255,255,255,0.3)] [&>div]:hover:border-l-white",
        ],
      },
      {
        intent: "white",
        outline: true,
        className: [
          "text-white border-white fill-white hover:bg-white hover:text-black hover:fill-black",
          "[&>div]:border-[rgba(255,255,255,0.3)] [&>div]:border-l-white [&>div]:hover:border-[rgba(0,0,0,0.3)] [&>div]:hover:border-l-black",
        ],
      },
      {
        intent: "black",
        outline: true,
        className: [
          "text-black border-black bg-transparent fill-black hover:bg-black hover:text-white hover:fill-white",
          "[&>div]:border-[rgba(0,0,0,0.3)] [&>div]:border-l-black [&>div]:hover:border-[rgba(255,255,255,0.3)] [&>div]:hover:border-l-white",
        ],
      },
      // Loading variants
      {
        intent: "primary",
        loading: true,
        className: "bg-primary text-white hover:bg-primary hover:text-white",
      },
      {
        intent: "secondary",
        loading: true,
        className: "bg-water text-white hover:bg-water hover:text-white",
      },
      {
        intent: "tertiary",
        loading: true,
        className: "bg-land text-white hover:bg-land hover:text-white",
      },
      {
        intent: "white",
        loading: true,
        className:
          "bg-white text-black hover:bg-white hover:text-black [&>div]:border-[rgba(0,0,0,0.3)] [&>div]:border-l-black",
      },
      {
        intent: "black",
        loading: true,
        className: "bg-black text-white hover:bg-black hover:text-white",
      },
      // solid variants
      {
        intent: "primary",
        solid: true,
        className: "hover:bg-primary hover:text-white hover:fill-white",
      },
      {
        intent: "secondary",
        solid: true,
        className: "hover:bg-water hover:text-white hover:fill-white",
      },

      {
        intent: "tertiary",
        solid: true,
        className: "hover:bg-land hover:text-white hover:fill-white",
      },
      {
        intent: "white",
        solid: true,
        className: "hover:bg-white hover:text-black hover:fill-black",
      },
      {
        intent: "black",
        solid: true,
        className: "hover:bg-black hover:text-white hover:fill-white",
      },
    ],
    defaultVariants: {
      intent: "primary",
      fullWidth: false,
      outline: false,
      small: false,
      mobileAdapt: false,
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: string | ReactNode | ReactNode[];
  withArrow?: true;
}

type ActionButtonType = {
  onClick: () => void;
  type: "action";
} & ButtonProps;

type SubmitButtonType = {
  type: "submit";
} & ButtonProps;

type RouteButtonType = {
  route: string;
  type: "route";
} & ButtonProps;

type LinkButtonType = {
  link: string;
  external?: true;
  type: "link";
} & ButtonProps;

type ButtonType =
  | ActionButtonType
  | SubmitButtonType
  | RouteButtonType
  | LinkButtonType;

const button = (props: VariantProps<typeof buttonVariants>) =>
  twMerge(buttonVariants(props));

const Button: React.FC<ButtonType> = (props): JSX.Element => {
  const {
    children,
    withArrow,
    intent,
    disabled,
    mobileAdapt,
    outline,
    solid,
    loading,
    fullWidth,
    small,
  } = props;

  switch (props.type) {
    case "action":
      return (
        <button
          className={button({
            intent,
            fullWidth,
            small,
            disabled,
            mobileAdapt,
            outline,
            solid,
            loading,
          })}
          aria-disabled={disabled ? "true" : "false"}
          disabled={disabled ? true : false}
          onClick={props.onClick}
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-[rgba(255,255,255,0.2)] border-l-white transition-[border] duration-200 ease-out" />
          ) : (
            <>
              <span className="text-inherit font-sans text-xs font-bold uppercase leading-snug tracking-[0.2em]">
                {children}
              </span>
              {withArrow && (
                <svg className="fill-inherit block h-2 w-6 transition-transform duration-200 ease-in-out group-hover/btn:translate-x-2">
                  <use xlinkHref="/assets/svg/sprites.svg#arrow-right-long" />
                </svg>
              )}
            </>
          )}
        </button>
      );
    case "route":
      return (
        <Link
          className={button({
            intent,
            fullWidth,
            small,
            disabled,
            mobileAdapt,
            outline,
            solid,
            loading,
          })}
          aria-disabled={disabled ? "true" : "false"}
          href={props.route}
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-[rgba(255,255,255,0.2)] border-l-white transition-[border] duration-200 ease-out" />
          ) : (
            <>
              <span className="text-inherit font-sans text-xs font-bold uppercase leading-snug tracking-[0.2em]">
                {children}
              </span>
              {withArrow && (
                <svg className="fill-inherit h-2 w-6 transition-transform duration-200 ease-in-out group-hover/btn:translate-x-2">
                  <use xlinkHref="/assets/svg/sprites.svg#arrow-right-long" />
                </svg>
              )}
            </>
          )}
        </Link>
      );
    case "link":
      return (
        <a
          className={button({
            intent,
            fullWidth,
            small,
            disabled,
            mobileAdapt,
            outline,
            solid,
            loading,
          })}
          aria-disabled={disabled ? "true" : "false"}
          href={props.link}
          target={props.external ? "_blank" : "_self"}
          rel={props.external ? "noopener noreferrer" : ""}
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-[rgba(255,255,255,0.2)] border-l-white transition-[border] duration-200 ease-out" />
          ) : (
            <>
              <span className="text-inherit font-sans text-xs font-bold uppercase leading-snug tracking-[0.2em]">
                {children}
              </span>
              {withArrow && (
                <svg className="fill-inherit h-2 w-6 transition-transform duration-200 ease-in-out group-hover/btn:translate-x-2">
                  <use xlinkHref="/assets/svg/sprites.svg#arrow-right-long" />
                </svg>
              )}
            </>
          )}
        </a>
      );
    case "submit":
      return (
        <button
          className={button({
            intent,
            fullWidth,
            small,
            disabled,
            mobileAdapt,
            outline,
            solid,
            loading,
          })}
          type="submit"
          aria-disabled={disabled ? "true" : "false"}
          disabled={disabled ? true : false}
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-[rgba(255,255,255,0.2)] border-l-white transition-[border] duration-200 ease-out" />
          ) : (
            <>
              <span className="text-inherit font-sans text-xs font-bold uppercase leading-snug tracking-[0.2em]">
                {children}
              </span>
              {withArrow && (
                <svg className="fill-inherit h-2 w-6 transition-transform duration-200 ease-in-out group-hover/btn:translate-x-2">
                  <use xlinkHref="/assets/svg/sprites.svg#arrow-right-long" />
                </svg>
              )}
            </>
          )}
        </button>
      );
  }
};

export type { ButtonType };
export { Button };
