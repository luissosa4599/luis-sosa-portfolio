import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardMockupProps {
  className?: string
  style?: React.CSSProperties
}

export function DashboardMockup({ className, style }: DashboardMockupProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface overflow-hidden",
        "shadow-[0_16px_64px_-16px_hsl(213_85%_20%/0.5),0_0_0_1px_hsl(213_100%_70%/0.06)]",
        className
      )}
      style={style}
    >
      {/* Top bar */}
      <div className="h-9 flex items-center gap-1.5 px-3 bg-background border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-3 h-5 rounded bg-surface-2 border border-border" />
      </div>

      {/* Body */}
      <div className="flex" style={{ height: 240 }}>
        {/* Sidebar */}
        <div className="w-11 border-r border-border bg-background/50 flex flex-col gap-1.5 p-2 pt-3">
          {[true, false, false, false, false].map((active, i) => (
            <div
              key={i}
              className={cn(
                "h-6 rounded",
                active
                  ? "bg-accent/20 border border-accent/25"
                  : "bg-surface-2 border border-border"
              )}
            />
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col gap-3 p-4">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { wide: false, accent: false },
              { wide: false, accent: true },
              { wide: false, accent: false },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-surface-2/60 p-2.5 flex flex-col gap-1.5"
              >
                <div className="h-1.5 w-3/4 rounded bg-border" />
                <div
                  className={cn(
                    "h-3.5 w-1/2 rounded",
                    card.accent ? "bg-accent/40" : "bg-muted/20"
                  )}
                />
              </div>
            ))}
          </div>

          {/* Chart + table row */}
          <div className="flex gap-2 flex-1 min-h-0">
            {/* Bar chart */}
            <div className="flex-1 rounded-md border border-border bg-surface-2/60 flex items-end gap-1 p-3 pb-2">
              {[40, 65, 55, 80, 48, 90, 60, 75].map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-t",
                    h >= 80 ? "bg-accent/55" : "bg-accent/22"
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Table */}
            <div className="flex-[1.3] rounded-md border border-border bg-surface-2/60 overflow-hidden">
              {[
                [true, false, false],
                [false, true, false],
                [false, false, true],
                [false, false, false],
                [true, false, false],
              ].map((row, ri) => (
                <div
                  key={ri}
                  className="flex items-center gap-2 px-2.5 border-b border-border last:border-0"
                  style={{ height: "20%" }}
                >
                  {row.map((a, ci) => (
                    <div
                      key={ci}
                      className={cn(
                        "h-1.5 rounded",
                        a ? "bg-accent/35" : "bg-border"
                      )}
                      style={{ width: `${[42, 28, 20][ci]}%` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
