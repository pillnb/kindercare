"use client";

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { savePersonalization } from './actions';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full py-3 font-semibold">
            {pending ? <Loader2 className="animate-spin" /> : 'Submit'}
        </Button>
    );
}

const topicOptions = [
    { id: 'keselamatan_pribadi', label: 'Memastikan anak paham batasan tubuh & sentuhan aman' },
    { id: 'pubertas', label: 'Mempersiapkan anak menghadapi perubahan fisik' },
    { id: 'hubungan_sosial', label: 'Membantu anak memilih teman & hubungan yang sehat' },
    { id: 'emosi', label: 'Membantu anak belajar mengelola perasaan & emosi baru' },
    { id: 'digital', label: 'Memberi edukasi tentang keamanan berinteraksi di internet' }
];

export default function SurveyPage() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [step1Data, setStep1Data] = useState({
        parentAge: '', childAge: '', childGender: '', childSpecialNeeds: 'no'
    });
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    
    const handleNext = (formData: FormData) => {
        const parentAge = formData.get('parentAge') as string;
        const childAge = formData.get('childAge') as string;
        const childGender = formData.get('childGender') as string;
        if (!parentAge || !childAge || !childGender) {
            setError('Harap isi semua informasi dasar yang wajib diisi.');
            return;
        }
        setStep1Data({
            parentAge, childAge, childGender,
            childSpecialNeeds: formData.get('childSpecialNeeds') as string
        });
        setError('');
        setStep(2);
    };

    const handleTopicChange = (category: string, checked: boolean | 'indeterminate') => {
        setSelectedTopics(prev => {
            const newTopics = checked ? [...prev, category] : prev.filter(t => t !== category);
            if (newTopics.length > 3) {
                alert("Anda hanya bisa memilih maksimal 3 topik.");
                return prev; 
            }
            return newTopics;
        });
    };

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <main className="w-full max-w-md bg-gray-100">
                <div className="bg-pink-400 pt-10 pb-24 rounded-b-[50px] text-center px-4">
                    <h1 className="text-3xl font-bold text-white">AI Personalized</h1>
                    <p className="text-white/90 mt-2">Bantu kami mengenal preferensi Anda untuk konten yang lebih sesuai</p>
                </div>
                
                <div className="px-6">
                    <Card className="w-full -mt-16 shadow-lg rounded-2xl overflow-hidden border-0 p-0 gap-0">
                        <CardHeader className="bg-white p-6">
                            <CardTitle className="text-xl font-semibold text-gray-800">{step === 1 ? 'Informasi Dasar' : 'Kebutuhan dan Preferensi Pembelajaran'}</CardTitle>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-3"><div className="bg-pink-500 h-2 rounded-full" style={{ width: step === 1 ? '50%' : '100%' }}></div></div>
                        </CardHeader>
                        <CardContent className="bg-white p-6 pt-0">
                            {step === 1 ? (
                                <form action={handleNext} className="space-y-6 pt-2">
                                    <div>
                                        <Label className="block font-medium text-gray-700">Berapa usia anda?</Label>
                                        <RadioGroup name="parentAge" className="mt-2 space-y-2" required>
                                            {/* PERBAIKAN: Menambahkan className="text-gray-700 font-normal" pada Label */}
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="20-26" id="age1" /><Label htmlFor="age1" className="text-gray-700 font-normal">20 - 26 tahun</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="27-35" id="age2" /><Label htmlFor="age2" className="text-gray-700 font-normal">27 - 35 tahun</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="36-45" id="age3" /><Label htmlFor="age3" className="text-gray-700 font-normal">36 - 45 tahun</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="45+" id="age4" /><Label htmlFor="age4" className="text-gray-700 font-normal">Diatas 45 tahun</Label></div>
                                        </RadioGroup>
                                    </div>
                                    <div>
                                        <Label className="block font-medium text-gray-700">Berapa usia anak anda?</Label>
                                        <RadioGroup name="childAge" className="mt-2 space-y-2" required>
                                            {/* PERBAIKAN: Menambahkan className="text-gray-700 font-normal" pada Label */}
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="0-3" id="childAge0" /><Label htmlFor="childAge0" className="text-gray-700 font-normal">&lt; 4 tahun</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="4-5" id="childAge1" /><Label htmlFor="childAge1" className="text-gray-700 font-normal">4 - 5 tahun</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="6-7" id="childAge2" /><Label htmlFor="childAge2" className="text-gray-700 font-normal">6 - 7 tahun</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="8+" id="childAge3" /><Label htmlFor="childAge3" className="text-gray-700 font-normal">8+ tahun</Label></div>
                                        </RadioGroup>
                                    </div>
                                    <div>
                                        <Label className="block font-medium text-gray-700">Apa jenis kelamin anak Anda?</Label>
                                        <RadioGroup name="childGender" className="mt-2 space-y-2" required>
                                            {/* PERBAIKAN: Menambahkan className="text-gray-700 font-normal" pada Label */}
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="gender1" /><Label htmlFor="gender1" className="text-gray-700 font-normal">Laki-laki</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="gender2" /><Label htmlFor="gender2" className="text-gray-700 font-normal">Perempuan</Label></div>
                                        </RadioGroup>
                                    </div>
                                    <div>
                                        <Label className="block font-medium text-gray-700">Apakah anak Anda memiliki kebutuhan khusus?</Label>
                                        <RadioGroup name="childSpecialNeeds" defaultValue="no" className="mt-2 space-y-2">
                                            {/* PERBAIKAN: Menambahkan className="text-gray-700 font-normal" pada Label */}
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="special1" /><Label htmlFor="special1" className="text-gray-700 font-normal">Ya</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="special2" /><Label htmlFor="special2" className="text-gray-700 font-normal">Tidak</Label></div>
                                        </RadioGroup>
                                    </div>
                                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full py-3 font-semibold mt-6">Next</Button>
                                </form>
                            ) : (
                                <form action={savePersonalization} className="space-y-4 pt-6">
                                    <input type="hidden" name="parentAge" value={step1Data.parentAge} />
                                    <input type="hidden" name="childAge" value={step1Data.childAge} />
                                    <input type="hidden" name="childGender" value={step1Data.childGender} />
                                    <input type="hidden" name="childSpecialNeeds" value={step1Data.childSpecialNeeds} />
                                    <div>
                                        <Label className="block font-medium text-gray-700">Apa fokus utama Anda saat ini? (Maksimal 3)</Label>
                                        {selectedTopics.map(topic => (<input key={topic} type="hidden" name="learningTopics" value={topic} />))}
                                        <div className="mt-2 space-y-2">
                                            {topicOptions.map(topic => (
                                                <div key={topic.id} className="flex items-center space-x-2">
                                                    <Checkbox id={topic.id} checked={selectedTopics.includes(topic.id)} onCheckedChange={(checked) => handleTopicChange(topic.id, checked)} />
                                                    {/* PERBAIKAN: Menambahkan className="text-gray-700 font-normal" pada Label */}
                                                    <Label htmlFor={topic.id} className="font-normal text-gray-700">{topic.label}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="block font-medium text-gray-700 leading-4">Bagaimana pandangan Anda tentang pendidikan seksual dalam konteks nilai-nilai keluarga Anda?</Label>
                                        <RadioGroup name="familyView" className="mt-2 space-y-2" required>
                                            {/* PERBAIKAN: Menambahkan className="text-gray-700 font-normal" pada Label */}
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="konservatif" id="view1" /><Label htmlFor="view1" className="text-gray-700 font-normal">Konservatif</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="moderat" id="view2" /><Label htmlFor="view2" className="text-gray-700 font-normal">Moderat</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="terbuka" id="view3" /><Label htmlFor="view3" className="text-gray-700 font-normal">Terbuka</Label></div>
                                        </RadioGroup>
                                    </div>
                                    <div>
                                        <Label className="block font-medium text-gray-700 leading-4">Apakah Anda ingin menerima konten yang mengandung perspektif atau panduan agama atau budaya tertentu?</Label>
                                        <RadioGroup name="religiousContent" defaultValue="no" className="mt-2 space-y-2">
                                            {/* PERBAIKAN: Menambahkan className="text-gray-700 font-normal" pada Label */}
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="religion1" /><Label htmlFor="religion1" className="text-gray-700 font-normal">Ya</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="religion2" /><Label htmlFor="religion2" className="text-gray-700 font-normal">Tidak</Label></div>
                                        </RadioGroup>
                                    </div>
                                    <SubmitButton />
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}