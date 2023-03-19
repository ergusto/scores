import { usePathname } from "next/navigation";
import Link from 'next/link';
import { cn } from "@/lib/utils"

const menuItems = [
	{
		title: 'Step 1',
		href: '/new',
	},
	{ title: 'Step 2',
		href: '/new/step-2',
	},
	{
		title: 'Step 3',
		href: '/new/step-3',
	}
];

export default function NewGameLayout({
  children
}: {
  children: React.ReactNode;
}) {
	const path = usePathname();

	return (
		<div className="container grid gap-12 md:grid-cols-[200px_1fr]">
			<aside className="hidden w-[200px] flex-col md:flex">
				<nav className="items-start grid gap-2">
					{menuItems.map(menuItem => {
						return (
							<Link key={menuItem.title} href={menuItem.href}>
								<span className={cn(
									"flex items-center px-3 py-2 text-sm font-medium group rounded-md text-slate-800 hover:bg-slate-100 transparent",
									path === menuItem.href ? "bg-slate-200" : "transparent",
								)}>{menuItem.title}</span>
							</Link>
						);
					})}
				</nav>
			</aside>
			<main className="flex flex-col flex-1 w-full overflow-hidden">
				<div className="items-start grid gap-8">
					<div className="flex justify-between px-2">
						<div className="grid gap-1">
							<h1 className="text-2xl font-bold tracking-wide text-slate-900">New Game</h1>
							<p className="text-neutral-500">Create a new Gin Rummy game</p>
						</div>
					</div>
					<div className="grid gap-10">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}

