import { DashboardVideo } from "@/components/ui/DashboardVideo";
import { videos } from "@/lib/assets";

export function HeroVideo() {
  return (
    <div className="relative w-full">
      <DashboardVideo
        src={videos.overview1}
        className="w-full aspect-video rounded-2xl shadow-[0_24px_58px_-36px_rgba(10,16,30,0.48)]"
      />
    </div>
  );
}
