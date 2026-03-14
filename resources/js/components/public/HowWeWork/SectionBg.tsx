// components/public/home/HowWeWork/SectionBg.tsx
type Props = {
  src: string;
  className?: string;     // wrapper
  imgClassName?: string;  // extra for <img>
  cover?: boolean;        // true => cover, false => fixed-size bg
};

export default function SectionBg({ src, className = "", imgClassName = "", cover = false }: Props) {
  if (cover) {
  // Mobile/tablet: use natural cover behavior
    return (
      <div aria-hidden className={`absolute inset-0 pointer-events-none ${className}`}>
        <img
          src={src}
          alt=""
          className={`h-full w-full object-cover object-center ${imgClassName}`}
          loading="lazy"
          draggable={false}
        />
      </div>
    );
  }

  // Desktop: fixed height with responsive scaling and centered background
  return (
    <div aria-hidden className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        className={` w-full 
          ${imgClassName}
        `}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
