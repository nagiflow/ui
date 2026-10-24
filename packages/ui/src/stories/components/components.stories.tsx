import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { FolderOpen, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, Avatar, Badge, Breadcrumb, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Checkbox, ConfirmDialog, Dialog, DialogBody, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, EmptyState, Field, Input, Label, Pagination, Progress,
  RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Skeleton, Switch,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Tooltip,
} from "../../index.ts"

const meta: Meta = { title: "Components/All" }
export default meta
type S = StoryObj

export const Buttons: S = {
  render: () => (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button>保存する</Button>
        <Button variant="secondary">キャンセル</Button>
        <Button variant="ghost">戻る</Button>
        <Button variant="destructive"><Trash2 />削除する</Button>
        <Button variant="link">詳細を見る</Button>
        <Button disabled>送信中…</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm"><Plus />追加</Button>
        <Button size="md">標準</Button>
        <Button size="lg">無料で始める</Button>
        <Button size="icon" variant="secondary" aria-label="編集"><Pencil /></Button>
      </div>
    </div>
  ),
}

export const Badges: S = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>下書き</Badge><Badge variant="brand">進行中</Badge><Badge variant="success">完了</Badge>
      <Badge variant="warning">要確認</Badge><Badge variant="destructive">期限切れ</Badge><Badge variant="outline">アーカイブ</Badge>
    </div>
  ),
}

export const Form: S = {
  render: () => (
    <form className="grid max-w-md gap-5">
      <Field label="プロジェクト名" required description="社内で一意になる名前を付けてください"><Input placeholder="例：新基幹システム移行" /></Field>
      <Field label="メールアドレス" required error="メールアドレスの形式が正しくありません。例：name@example.com"><Input type="email" defaultValue="tanaka@" /></Field>
      <Field label="担当部署">
        <Select defaultValue="dev">
          <SelectTrigger><SelectValue placeholder="選択してください" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="dev">開発部</SelectItem><SelectItem value="sales">営業部</SelectItem><SelectItem value="ops">業務推進部</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="概要" optional><Textarea placeholder="目的や背景を記入" /></Field>
      <fieldset className="grid gap-3">
        <legend className="mb-2 text-sm font-semibold">公開範囲</legend>
        <RadioGroup defaultValue="team">
          <div className="flex items-center gap-2"><RadioGroupItem value="team" id="r1" /><Label htmlFor="r1" className="font-normal">チームのみ</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="org" id="r2" /><Label htmlFor="r2" className="font-normal">組織全体</Label></div>
        </RadioGroup>
      </fieldset>
      <div className="flex items-center gap-2"><Checkbox id="c1" defaultChecked /><Label htmlFor="c1" className="font-normal">作成後に関係者へ通知する</Label></div>
      <div className="flex items-center justify-between"><Label htmlFor="s1" className="font-normal">週次レポートを受け取る</Label><Switch id="s1" /></div>
      <div className="flex justify-end gap-2"><Button variant="secondary" type="button">キャンセル</Button><Button type="submit">作成する</Button></div>
    </form>
  ),
}

export const Feedback: S = {
  render: () => (
    <div className="grid max-w-2xl gap-3">
      <Alert variant="info" title="メンテナンスのお知らせ">10月30日 2:00〜4:00 の間、一部機能がご利用いただけません。</Alert>
      <Alert variant="success" title="招待を送信しました" />
      <Alert variant="warning" title="請求先情報が未登録です" action={<Button size="sm" variant="secondary">登録する</Button>}>次回の請求日までに登録してください。</Alert>
      <Alert variant="destructive" title="保存できませんでした">通信が切断されました。接続を確認してから、もう一度お試しください。</Alert>
      <Card><EmptyState icon={<FolderOpen />} title="プロジェクトはまだありません" description="最初のプロジェクトを作成すると、ここに一覧で表示されます。" action={<Button><Plus />プロジェクトを作成</Button>} /></Card>
      <div className="grid gap-2"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-1/2" /></div>
      <Progress value={64} />
    </div>
  ),
}

export const Navigation: S = {
  render: function Render() {
    const [page, setPage] = useState(2)
    return (
      <div className="grid gap-8">
        <Breadcrumb items={[{ label: "ホーム", href: "#" }, { label: "プロジェクト", href: "#" }, { label: "新基幹システム移行" }]} />
        <Tabs defaultValue="a">
          <TabsList><TabsTrigger value="a">概要</TabsTrigger><TabsTrigger value="b">タスク</TabsTrigger><TabsTrigger value="c">メンバー</TabsTrigger></TabsList>
          <TabsContent value="a">概要タブの内容</TabsContent><TabsContent value="b">タスクタブの内容</TabsContent><TabsContent value="c">メンバータブの内容</TabsContent>
        </Tabs>
        <Pagination page={page} pageSize={20} total={128} onPageChange={setPage} />
      </div>
    )
  },
}

export const Overlays: S = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild><Button variant="secondary">メンバーを招待</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>メンバーを招待</DialogTitle><DialogDescription>招待メールは7日間有効です。</DialogDescription></DialogHeader>
          <DialogBody className="grid gap-4"><Field label="メールアドレス" required><Input type="email" placeholder="name@example.com" /></Field></DialogBody>
          <DialogFooter><DialogClose asChild><Button variant="secondary">キャンセル</Button></DialogClose><Button>招待を送信</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmDialog trigger={<Button variant="destructive">プロジェクトを削除</Button>} title="プロジェクトを削除しますか？" description="「新基幹システム移行」と関連するタスク 42 件が削除されます。この操作は取り消せません。" confirmLabel="削除する" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="secondary" size="icon" aria-label="操作"><MoreHorizontal /></Button></DropdownMenuTrigger>
        <DropdownMenuContent><DropdownMenuItem><Pencil />編集</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem destructive><Trash2 />削除</DropdownMenuItem></DropdownMenuContent>
      </DropdownMenu>
      <Tooltip content="最後に保存した日時から24時間保持されます"><Button variant="ghost">ヘルプ</Button></Tooltip>
    </div>
  ),
}

export const DataDisplay: S = {
  render: () => (
    <div className="grid gap-6">
      <Card>
        <CardHeader><div><CardTitle>メンバー</CardTitle><CardDescription>3名が参加しています</CardDescription></div><Button size="sm" variant="secondary"><Plus />招待</Button></CardHeader>
        <Table>
          <TableHeader><TableRow><TableHead>氏名</TableHead><TableHead>権限</TableHead><TableHead numeric>担当タスク</TableHead></TableRow></TableHeader>
          <TableBody>
            {[["佐藤 葵", "管理者", 12], ["鈴木 拓海", "編集者", 8], ["高橋 美咲", "閲覧者", 0]].map(([n, r, c]) => (
              <TableRow key={n as string}>
                <TableCell><div className="flex items-center gap-2.5"><Avatar name={n as string} />{n}</div></TableCell>
                <TableCell><Badge variant={r === "管理者" ? "brand" : "neutral"}>{r}</Badge></TableCell>
                <TableCell numeric>{c}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardFooter><Button variant="link" size="sm">すべて表示</Button></CardFooter>
      </Card>
      <Accordion type="single" collapsible className="max-w-2xl">
        <AccordionItem value="1"><AccordionTrigger>無料トライアル期間はありますか？</AccordionTrigger><AccordionContent>はい、すべてのプランで14日間お試しいただけます。</AccordionContent></AccordionItem>
        <AccordionItem value="2"><AccordionTrigger>途中でプランを変更できますか？</AccordionTrigger><AccordionContent>いつでも変更でき、差額は日割りで精算されます。</AccordionContent></AccordionItem>
      </Accordion>
    </div>
  ),
}
