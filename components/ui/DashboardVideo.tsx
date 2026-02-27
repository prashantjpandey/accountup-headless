import { LazyVideo } from "@/components/ui/LazyVideo";

type DashboardVideoProps = {
  src: string;
  className?: string;
  ariaHidden?: boolean;
  loopStartSeconds?: number;
  loopEndSeconds?: number;
};

export function DashboardVideo({
  src,
  className = "",
  ariaHidden,
  loopStartSeconds,
  loopEndSeconds,
}: DashboardVideoProps) {
  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
    >
      <LazyVideo
        src={src}
        ariaHidden={ariaHidden}
        loopStartSeconds={loopStartSeconds}
        loopEndSeconds={loopEndSeconds}
        className="w-full h-full"
      />
    </div>
  );
}

