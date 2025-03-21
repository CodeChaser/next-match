'use client';

import { GoInbox } from 'react-icons/go';
import { MdOutlineOutbox } from 'react-icons/md';
import clsx from 'clsx';
// prettier-ignore
import { usePathname, useRouter, useSearchParams,} from 'next/navigation';
import { useState } from 'react';
import { Chip } from '@heroui/chip';

export default function MessageSideBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [selected, setSelected] = useState<string>(
        searchParams.get('container') || 'inbox',
    );

    const items = [
        {
            key: 'inbox',
            label: 'Inbox',
            icon: GoInbox,
            chip: true,
        },
        {
            key: 'outbox',
            label: 'Outbox',
            icon: MdOutlineOutbox,
            chip: true,
        },
    ];

    const handleSelect = (key: string) => {
        setSelected(key);
        const params = new URLSearchParams();
        params.set('container', key);
        router.replace(`${pathname}?${params}`);
    };

    return (
        <div className="flex flex-col shadow-md rounded-lg cursor-pointer">
            {items.map(
                ({ key, icon: Icon, label, chip }) => (
                    <div
                        key={key}
                        className={clsx(
                            'flex items-center rounded-t-lg gap-2 p-3',
                            {
                                'text-secondary font-semibold':
                                    selected === key,
                                'text-black hover:text-secondary/70':
                                    selected !== key,
                            },
                        )}
                        onClick={() => handleSelect(key)}
                    >
                        <Icon size={24} />
                        <div className="flex justify-between flex-grow">
                            <span>{label}</span>
                            {chip && <Chip>0</Chip>}
                        </div>
                    </div>
                ),
            )}
        </div>
    );
}
