import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Users, Trophy } from "lucide-react";
import { clearSessions, leaderboard, loadSessions, type LabSession } from "@/lib/lab/records";

export default function TeacherPanel({ refreshKey }: { refreshKey: number }) {
  const [version, setVersion] = useState(0);
  const sessions: LabSession[] = useMemo(() => loadSessions(), [refreshKey, version]);
  const board = useMemo(() => leaderboard(sessions), [sessions]);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-semibold">Leaderboard</h3>
          <Badge variant="secondary" className="ml-auto">{board.length} typists</Badge>
        </div>
        {!board.length ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No sessions recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Typist</TableHead>
                  <TableHead>Best WPM</TableHead>
                  <TableHead>Avg Accuracy</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Words</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {board.map((r, i) => (
                  <TableRow key={r.student}>
                    <TableCell className="font-semibold">{i + 1}</TableCell>
                    <TableCell>{r.student}</TableCell>
                    <TableCell className="font-bold text-primary">{r.best}</TableCell>
                    <TableCell>{Math.round(r.avgAcc)}%</TableCell>
                    <TableCell>{r.tests}</TableCell>
                    <TableCell>{r.totalWords}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Session history</h3>
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto text-destructive"
            onClick={() => {
              clearSessions();
              setVersion((v) => v + 1);
            }}
          >
            <Trash2 className="mr-1 h-3 w-3" /> Clear
          </Button>
        </div>
        {!sessions.length ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Sessions you finish will be listed here.</p>
        ) : (
          <div className="max-h-[380px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Typist</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>WPM</TableHead>
                  <TableHead>Acc</TableHead>
                  <TableHead>Errors</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="whitespace-nowrap text-xs">{new Date(s.date).toLocaleString()}</TableCell>
                    <TableCell>{s.student}</TableCell>
                    <TableCell className="text-xs">{s.mode}</TableCell>
                    <TableCell className="font-semibold">{s.wpm}</TableCell>
                    <TableCell>{s.accuracy}%</TableCell>
                    <TableCell className="text-destructive">{s.errors}</TableCell>
                    <TableCell>{s.duration}s</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
