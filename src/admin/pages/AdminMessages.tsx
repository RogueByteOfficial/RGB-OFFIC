import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle, 
  Circle, 
  Search, 
  ExternalLink,
  MessageCircle,
  Eye,
  X,
  Filter
} from 'lucide-react';
import { getMessages, markMessageRead, deleteMessage } from '../../services/firestore';
import { ContactMessage } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(data);
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to fetch contact messages', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      try {
        await markMessageRead(msg.id, true);
        setMessages(messages.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m)));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleToggleRead = async (msg: ContactMessage, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updatedRead = !msg.isRead;
      await markMessageRead(msg.id, updatedRead);
      setMessages(messages.map((m) => (m.id === msg.id ? { ...m, isRead: updatedRead } : m)));
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, isRead: updatedRead });
      }
      setToast({ message: `Message marked as ${updatedRead ? 'read' : 'unread'}`, type: 'info' });
    } catch (e) {
      setToast({ message: 'Failed to update message status', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteMessage(deleteConfirmId);
      setToast({ message: 'Message deleted successfully', type: 'success' });
      if (selectedMessage?.id === deleteConfirmId) {
        setSelectedMessage(null);
      }
      setDeleteConfirmId(null);
      await loadData();
    } catch (e) {
      setToast({ message: 'Failed to delete message', type: 'error' });
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === 'unread') return matchesSearch && !msg.isRead;
    if (filterType === 'read') return matchesSearch && msg.isRead;
    return matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6 pb-12">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            <span>Client Inquiries & Messages</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time inbox receiving submissions from your public website contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-200 dark:border-purple-800">
            {unreadCount} Unread
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
            {messages.length} Total
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by sender, email or text..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilterType('unread')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === 'unread'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilterType('read')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === 'read'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading messages...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <MessageSquare className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">No Messages Matching Filter</h3>
          <p className="text-xs text-slate-400">All customer and partner inquiries will appear in this inbox.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !msg.isRead
                  ? 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-200/80 dark:border-purple-900/50 hover:border-purple-400 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <button
                  onClick={(e) => handleToggleRead(msg, e)}
                  title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                  className="mt-0.5 text-slate-400 hover:text-purple-600 transition shrink-0"
                >
                  {msg.isRead ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4 fill-purple-600 text-purple-600 animate-pulse" />
                  )}
                </button>

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-black truncate ${!msg.isRead ? 'text-purple-900 dark:text-purple-200' : 'text-slate-900 dark:text-white'}`}>
                      {msg.name}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate">
                      &lt;{msg.email}&gt;
                    </span>
                    {msg.phone && (
                      <span className="text-[11px] text-slate-500 font-mono">
                        {msg.phone}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {msg.subject || 'No Subject'}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {msg.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="text-[10px] text-slate-400 font-medium">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirmId(msg.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Reader Modal */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="Message Details"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-6">
            {/* Sender Meta Info */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {selectedMessage.name}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : ''}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <a href={`mailto:${selectedMessage.email}`} className="text-blue-500 hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>

                {selectedMessage.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <a href={`tel:${selectedMessage.phone}`} className="text-emerald-500 hover:underline">
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Subject & Message Content */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Subject
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedMessage.subject || 'Direct Inquiry'}
              </h4>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Message Body
              </span>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(selectedMessage.id)}
                className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedMessage.phone && (
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                )}

                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Inquiry')}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        title="Delete Message"
        message="Are you sure you want to delete this message record?"
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
