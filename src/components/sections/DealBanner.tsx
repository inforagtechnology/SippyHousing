import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";
import { Property } from "@/lib/supabase";
import { propertyService } from "@/services/propertyService";
import { getPropertyPriceStr, formatPriceWithCommas } from "@/lib/utils";

interface DealBannerProps {
  allProperties?: Property[];
}

const LABELS = ["Deal of the Year", "Deal of the Month"] as const;

/**
 * Flashing homepage banner for properties/projects marked "Deal of the Year"
 * or "Deal of the Month" in the admin form. Renders nothing if none are marked.
 * Several deals rotate automatically.
 */
const DealBanner = ({ allProperties }: DealBannerProps) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState<Record<string, string>>({});

  const deals = useMemo(
    () =>
      (allProperties || [])
        .filter((p) => LABELS.includes(p.deal_highlight as (typeof LABELS)[number]))
        // Deal of the Year first
        .sort((a, b) => (a.deal_highlight === "Deal of the Year" ? -1 : 0) - (b.deal_highlight === "Deal of the Year" ? -1 : 0)),
    [allProperties]
  );

  useEffect(() => {
    if (deals.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % deals.length), 5000);
    return () => clearInterval(t);
  }, [deals.length]);

  const current = deals.length ? deals[index % deals.length] : null;

  useEffect(() => {
    if (!current || image[current.id]) return;
    propertyService
      .getPropertyImages(current.id)
      .then((imgs) => imgs[0] && setImage((m) => ({ ...m, [current.id]: imgs[0].image_url })))
      .catch(() => undefined);
  }, [current, image]);

  if (!current) return null;

  const price = getPropertyPriceStr(current);
  const priceShown = price ? formatPriceWithCommas(price) || price : "";
  const isYear = current.deal_highlight === "Deal of the Year";

  return (
    <section id="deal-banner" className="bg-sippy-charcoal py-4">
      <style>{`
        @keyframes dealFlash { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(201,168,76,.7);} 50% { opacity: .82; box-shadow: 0 0 0 10px rgba(201,168,76,0);} }
        .deal-flash { animation: dealFlash 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .deal-flash { animation: none; } }
      `}</style>
      <div className="section-container">
        <button
          type="button"
          onClick={() => navigate(`/property/${current.id}`)}
          className="deal-flash w-full flex flex-col sm:flex-row items-center gap-4 text-left rounded-xl border border-sippy-gold bg-gradient-to-r from-sippy-gold/20 via-sippy-charcoal to-sippy-gold/20 p-3 sm:p-4"
        >
          {image[current.id] && (
            <img src={image[current.id]} alt="" className="h-20 w-32 object-cover rounded-lg hidden sm:block" />
          )}
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1 bg-sippy-gold text-sippy-charcoal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              <Sparkles className="h-3 w-3" /> {isYear ? "Deal of the Year" : "Deal of the Month"}
            </span>
            <h3 className="text-white font-playfair text-lg sm:text-xl mt-1 truncate">
              {current.header || current.building || current.society_property_name}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 text-white/80 text-sm">
              <span className="inline-flex items-center"><MapPin className="h-3.5 w-3.5 text-sippy-gold mr-1" />{current.location || current.sub_location}</span>
              {priceShown && <span className="text-sippy-gold font-semibold">₹ {priceShown}</span>}
            </div>
          </div>
          <span className="inline-flex items-center text-sippy-gold font-semibold text-sm shrink-0">
            View deal <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </button>
        {deals.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-2">
            {deals.map((d, i) => (
              <button key={d.id} aria-label={`Deal ${i + 1}`} onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index % deals.length ? "w-6 bg-sippy-gold" : "w-1.5 bg-white/40"}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DealBanner;
