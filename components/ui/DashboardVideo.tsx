import { LazyVideo } from "@/components/ui/LazyVideo";

type DashboardVideoProps = {
  src: string;
  className?: string;
  ariaHidden?: boolean;
};

export function DashboardVideo({
  src,
  className = "",
  ariaHidden,
}: DashboardVideoProps) {
  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
    >
      <LazyVideo
        src={src}
        ariaHidden={ariaHidden}
        className="w-full h-full"
      />
    </div>
  );
}

