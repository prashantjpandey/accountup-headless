import { DashboardVideo } from "@/components/ui/DashboardVideo";
import { videos } from "@/lib/assets";

export function HeroVideo() {
  return (
    <div className="relative w-full max-w-2xl">
      <DashboardVideo
        src={videos.overview1}
        className="w-full aspect-video"
      />
    </div>
  );
}

