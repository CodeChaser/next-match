import { deleteMessage } from '@/app/actions/messageActions';
import { MessageDto } from '@/lib/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useCallback, Key, useEffect } from 'react';
import useMessageStore from './useMessageStore';
import { useShallow } from 'zustand/shallow';

export const useMessages = (initialMessages: MessageDto[]) => {
    const { set, remove, messages, updateUnreadCount } = useMessageStore(
        useShallow(state => ({
            set: state.set,
            remove: state.remove,
            messages: state.messages,
            updateUnreadCount: state.updateUnreadCount,
        })),
    );
    const router = useRouter();
    const searchParams = useSearchParams();
    const isOutbox = searchParams.get('container') === 'outbox';
    const [isDeleting, setDeleting] = useState({ id: '', loading: false });

    useEffect(() => {
        set(initialMessages);

        return () => {
            set([]);
        };
    }, [initialMessages, set]);

    const columns = [
        { key: isOutbox ? 'recipientName' : 'senderName', label: isOutbox ? 'Recipient' : 'Sender' },
        { key: 'text', label: 'Message' },
        { key: 'created', label: isOutbox ? 'Date sent' : 'Date received' },
        { key: 'actions', label: 'Actions' },
    ];

    const handleDeleteMessage = useCallback(
        async (message: MessageDto) => {
            setDeleting({ id: message.id, loading: true });
            await deleteMessage(message.id, isOutbox);
            remove(message.id);
            if (!message.dateRead && !isOutbox) updateUnreadCount(-1);
            setDeleting({ id: '', loading: false });
        },
        [isOutbox, updateUnreadCount, remove],
    );

    const handleRowSelect = (key: Key) => {
        const message = messages.find(m => m.id === key);
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`;
        router.push(url + '/chat');
    };

    return {
        isOutbox,
        columns,
        deleteMessage: handleDeleteMessage,
        selectRow: handleRowSelect,
        isDeleting,
        messages,
    };
};
