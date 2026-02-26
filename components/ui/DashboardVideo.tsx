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
      className={`relative overflow-hidden w-full rounded-2xl shadow-sm transition-transform transition-shadow duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      <LazyVideo
        src={src}
        ariaHidden={ariaHidden}
        className="w-full h-full"
      />
    </div>
  );
}

