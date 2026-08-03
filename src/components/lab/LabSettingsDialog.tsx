import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FONT_OPTIONS, type LabSettings, type PanelPosition } from "@/lib/lab/settings";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  settings: LabSettings;
  onChange: (patch: Partial<LabSettings>) => void;
  panel: PanelPosition;
  onPanelChange: (p: PanelPosition) => void;
}

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-2">
    <Label className="text-sm">{label}</Label>
    <div className="min-w-[170px]">{children}</div>
  </div>
);

export default function LabSettingsDialog({ open, onOpenChange, settings, onChange, panel, onPanelChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Lab Settings</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-3 [&_[data-radix-scroll-area-scrollbar]]:hidden">
          <div className="divide-y">
            <div className="pb-2">
              <Row label="Timer">
                <Switch checked={settings.timerEnabled} onCheckedChange={(v) => onChange({ timerEnabled: v })} />
              </Row>
              <Row label="Timer mode">
                <Select value={settings.timerMode} onValueChange={(v) => onChange({ timerMode: v as LabSettings["timerMode"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectItem value="countup">Count Up</SelectItem>
                    <SelectItem value="countdown">Count Down</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </Row>
              <Row label="Duration (minutes)">
                <Select value={String(settings.durationMin)} onValueChange={(v) => onChange({ durationMin: Number(v) })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    {[5, 10, 15, 20, 30, 45, 60].map((m) => (
                      <SelectItem key={m} value={String(m)}>{m} Minutes</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Row>
            </div>

            <div className="py-2">
              <Row label="Backspace">
                <Select value={settings.backspace} onValueChange={(v) => onChange({ backspace: v as LabSettings["backspace"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                    <SelectItem value="disabled">Disable</SelectItem>
                    <SelectItem value="word">Only Current Word</SelectItem>
                    <SelectItem value="line">Only Current Line</SelectItem>
                    <SelectItem value="competition">Competition Mode</SelectItem>
                  </SelectContent>
                </Select>
              </Row>
              <Row label="Cursor">
                <Select value={settings.cursor} onValueChange={(v) => onChange({ cursor: v as LabSettings["cursor"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectItem value="thin">Thin</SelectItem>
                    <SelectItem value="block">Block</SelectItem>
                    <SelectItem value="underline">Underline</SelectItem>
                    <SelectItem value="animated">Animated</SelectItem>
                  </SelectContent>
                </Select>
              </Row>
            </div>

            <div className="py-2">
              <Row label="Font">
                <Select value={settings.fontFamily} onValueChange={(v) => onChange({ fontFamily: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    {FONT_OPTIONS.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Row>
              <Row label={`Font size — ${settings.fontSize}px`}>
                <Slider value={[settings.fontSize]} min={12} max={34} step={1} onValueChange={([v]) => onChange({ fontSize: v })} />
              </Row>
              <Row label={`Line height — ${settings.lineHeight}`}>
                <Slider value={[settings.lineHeight * 10]} min={12} max={30} step={1} onValueChange={([v]) => onChange({ lineHeight: v / 10 })} />
              </Row>
              <Row label="Paper size">
                <Select value={settings.paperSize} onValueChange={(v) => onChange({ paperSize: v as LabSettings["paperSize"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="wide">Wide</SelectItem>
                  </SelectContent>
                </Select>
              </Row>
              <Row label="Theme">
                <Select value={settings.theme} onValueChange={(v) => onChange({ theme: v as LabSettings["theme"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </Row>
              <Row label="Practice panel">
                <Select value={panel} onValueChange={(v) => onPanelChange(v as PanelPosition)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="floating">Floating</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </Row>
            </div>

            <div className="py-2">
              <Row label="Focus mode">
                <Switch checked={settings.focusMode} onCheckedChange={(v) => onChange({ focusMode: v })} />
              </Row>
              <Row label="AI error analysis">
                <Switch checked={settings.aiAnalysis} onCheckedChange={(v) => onChange({ aiAnalysis: v })} />
              </Row>
              <Row label="Auto save">
                <Switch checked={settings.autoSave} onCheckedChange={(v) => onChange({ autoSave: v })} />
              </Row>
              <Row label="Auto backup">
                <Switch checked={settings.autoBackup} onCheckedChange={(v) => onChange({ autoBackup: v })} />
              </Row>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
