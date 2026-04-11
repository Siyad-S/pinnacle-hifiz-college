'use client';

import { ContactInfo } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Send, MessageCircle } from 'lucide-react';
import { useContact, useContactActions } from '@/store';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be valid'),
    subject: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
    title: string;
    subtitle: string;
    info: ContactInfo;
}

export default function ContactForm({ title, subtitle, info }: ContactFormProps) {
    const { status, errorMessage } = useContact();
    const { submitContact, resetContact } = useContactActions();

    const isSubmitting = status === 'sending';
    const isSuccess = status === 'success';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await submitContact({
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
            });
            reset();
        } catch {
            // error is stored in store; we just stay on the form
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Patterns */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                            {title}
                        </h2>
                        <p className="text-xl text-slate-200 mb-12 leading-relaxed">
                            {subtitle}
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 glass-pill rounded-lg text-accent">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1 text-white">Our Location</h3>
                                    <p className="text-slate-300 max-w-xs whitespace-pre-line">{info.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 glass-pill rounded-lg text-accent">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1 text-white">Email Us</h3>
                                    <p className="text-slate-300">{info.email}</p>
                                </div>
                            </div>

                            {info.phone && (
                                <div className="flex items-start gap-4">
                                    <div className="p-3 glass-pill rounded-lg text-accent">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 text-white">Call Us</h3>
                                        <p className="text-slate-300">{info.phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Socials */}
                        <div className="mt-12 flex gap-4">
                            {/* {info.socials.facebook && (
                                <a href={info.socials.facebook} className="p-3 glass-pill hover:bg-white/20 rounded-full transition-colors text-white">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )} */}
                            {info.socials.instagram && (
                                <a href={info.socials.instagram} className="p-3 glass-pill hover:bg-white/20 rounded-full transition-colors text-white">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {/* {info.socials.youtube && (
                                <a href={info.socials.youtube} className="p-3 glass-pill hover:bg-white/20 rounded-full transition-colors text-white">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            )} */}
                            {info.socials.whatsapp && (
                                <a href={info.socials.whatsapp} className="p-3 glass-pill hover:bg-white/20 rounded-full transition-colors text-white">
                                    <MessageCircle className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 md:p-10 rounded-3xl"
                    >
                         {isSuccess ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                                    <Send className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-heading font-bold mb-2 text-white">Message Sent!</h3>
                                <p className="text-slate-300">We will get back to you shortly.</p>
                                <button
                                    onClick={() => { resetContact(); reset(); }}
                                    className="mt-8 text-primary font-semibold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>

                                {/* Store-level error banner */}
                                {status === 'error' && errorMessage && (
                                    <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                        {errorMessage}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-200">Full Name</label>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="Enter your name"
                                        />
                                        {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-200">Phone</label>
                                        <input
                                            {...register('phone')}
                                            type="tel"
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-200">Email Address</label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="Enter your email address"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-200">Message</label>
                                    <textarea
                                        {...register('message')}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                        placeholder="Enter your message"
                                    />
                                    {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    {!isSubmitting && <Send className="w-4 h-4" />}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
