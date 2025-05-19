"use client";

import { useState, FormEvent, ChangeEvent, useEffect, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import toast from 'react-hot-toast';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableImageItemProps {
  id: string;
  preview: string;
  index: number;
  onRemove: (index: number) => void;
}

function SortableImageItem({ id, preview, index, onRemove }: SortableImageItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : undefined, opacity: isDragging ? 0.5 : undefined };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative group touch-manipulation">
      <img src={preview} alt={`Pré-visualização ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md cursor-grab group-active:cursor-grabbing" />
      <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(index); }} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs w-6 h-6 flex items-center justify-center leading-none opacity-75 group-hover:opacity-100 transition-opacity z-20" aria-label="Remover imagem">X</button>
    </div>
  );
}

interface BenefitItem {
  id: string;
  text: string;
  icon: string;
}

// Interface para a paleta de cores
interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

export default function CreateLandingPage() {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionProfessional, setDescriptionProfessional] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Referência para o objeto de reconhecimento de voz
  const recognitionRef = useRef<any>(null);

  const [imageItems, setImageItems] = useState<{ id: string; file: File; preview: string }[]>([]);

  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoFilePreview, setVideoFilePreview] = useState<string | null>(null);
  const [videoChoice, setVideoChoice] = useState<"url" | "upload" | "none">("none");

  const initialBenefitItems = () => Array.from({ length: 5 }, (_, i) => ({ id: `benefit-${Date.now()}-${i}`, text: "", icon: "" }));
  const [benefitItems, setBenefitItems] = useState<BenefitItem[]>(initialBenefitItems);
  
  const [ctaButtonText, setCtaButtonText] = useState("Contactar Agora");

  // Estado para a paleta de cores
  const [colorPalette, setColorPalette] = useState<ColorPalette>({
    primary: "#3B82F6", // Azul como cor primária padrão
    secondary: "#1E3A8A", // Azul escuro como cor secundária padrão
    accent: "#EF4444"    // Vermelho como cor de destaque padrão
  });
  const [colorSelectionMode, setColorSelectionMode] = useState<"manual" | "auto">("manual");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
      if (!user) {
        toast.error("Sessão não encontrada. Por favor, inicie sessão novamente.");
        router.push("/auth/login");
      }
    };
    getUser();
  }, [supabase, router]);

  useEffect(() => {
    return () => {
      imageItems.forEach(item => URL.revokeObjectURL(item.preview));
      if (videoFilePreview) URL.revokeObjectURL(videoFilePreview);
      
      // Limpar o reconhecimento de voz ao desmontar o componente
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [imageItems, videoFilePreview]);

  // Função para iniciar a gravação de voz
  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("O seu navegador não suporta reconhecimento de voz. Tente usar o Chrome, Edge ou Safari.");
      return;
    }

    // Inicializar o objeto de reconhecimento de voz
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    // Configurar o reconhecimento
    recognitionRef.current.lang = 'pt-PT'; // Definir idioma para português de Portugal
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    let finalTranscript = '';
    
    // Evento para processar os resultados
    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Atualizar o campo de descrição com o texto transcrito
      setDescription(finalTranscript + interimTranscript);
    };
    
    // Evento para quando o reconhecimento terminar
    recognitionRef.current.onend = () => {
      setIsRecording(false);
      if (finalTranscript) {
        improveDescription(finalTranscript);
      }
    };
    
    // Evento para erros
    recognitionRef.current.onerror = (event: any) => {
      console.error('Erro no reconhecimento de voz:', event.error);
      setIsRecording(false);
      toast.error(`Erro no reconhecimento de voz: ${event.error}`);
    };
    
    // Iniciar o reconhecimento
    recognitionRef.current.start();
    setIsRecording(true);
    toast.success("A gravar... Fale agora.");
  };
  
  // Função para parar a gravação de voz
  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Função para melhorar a descrição com IA
  const improveDescription = async (text: string) => {
    if (!text.trim()) return;
    
    setIsProcessingVoice(true);
    toast.loading("A melhorar o texto com IA...", { id: "improving-text" });
    
    try {
      // Simulação de processamento de IA (em produção, seria uma chamada a uma API de IA)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Exemplo de melhoria simples do texto (em produção, seria substituído por uma chamada real à API de IA)
      const improvedText = improveTextWithSimpleRules(text);
      
      setDescriptionProfessional(improvedText);
      setDescription(improvedText); // Atualizar o campo de descrição com o texto melhorado
      
      toast.success("Texto melhorado com sucesso!", { id: "improving-text" });
    } catch (error) {
      console.error("Erro ao melhorar o texto:", error);
      toast.error("Não foi possível melhorar o texto. Por favor, tente novamente.", { id: "improving-text" });
    } finally {
      setIsProcessingVoice(false);
    }
  };

  // Função simples para melhorar o texto (simulação de IA)
  const improveTextWithSimpleRules = (text: string): string => {
    // Remover espaços extras e normalizar pontuação
    let improved = text.trim()
      .replace(/\s+/g, ' ')
      .replace(/\s+\./g, '.')
      .replace(/\s+,/g, ',');
    
    // Garantir que cada frase começa com maiúscula
    improved = improved.replace(/\. [a-z]/g, match => match.toUpperCase());
    
    // Garantir que a primeira letra do texto é maiúscula
    if (improved.length > 0) {
      improved = improved.charAt(0).toUpperCase() + improved.slice(1);
    }
    
    // Adicionar um tom mais profissional (simulação simples)
    const professionalPhrases = [
      "Este produto oferece uma experiência única e inovadora.",
      "Desenvolvido com os mais altos padrões de qualidade.",
      "Pensado para atender às necessidades mais exigentes.",
      "Uma solução completa para o seu negócio ou projeto.",
      "Destaque-se com esta proposta de valor excepcional."
    ];
    
    // Se o texto for muito curto, adicionar uma frase profissional
    if (improved.split(' ').length < 10) {
      improved += " " + professionalPhrases[Math.floor(Math.random() * professionalPhrases.length)];
    }
    
    // Garantir que o texto termina com ponto final
    if (!improved.endsWith('.') && !improved.endsWith('!') && !improved.endsWith('?')) {
      improved += '.';
    }
    
    return improved;
  };

  // Função para gerar uma paleta de cores automática
  const generateAutomaticColorPalette = () => {
    // Gerar uma cor primária aleatória (em formato HSL para melhor controle)
    const hue = Math.floor(Math.random() * 360); // Matiz aleatório
    
    // Criar cores complementares baseadas na cor primária
    const primary = `hsl(${hue}, 70%, 50%)`;
    const secondary = `hsl(${(hue + 30) % 360}, 60%, 30%)`; // Cor secundária mais escura
    const accent = `hsl(${(hue + 180) % 360}, 80%, 60%)`; // Cor de destaque complementar
    
    // Converter HSL para HEX para armazenamento
    const hslToHex = (h: number, s: number, l: number): string => {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };
    
    // Atualizar a paleta de cores
    setColorPalette({
      primary: primary,
      secondary: secondary,
      accent: accent
    });
    
    toast.success("Paleta de cores gerada automaticamente!");
  };

  // Efeito para gerar paleta automática quando o modo é alterado para 'auto'
  useEffect(() => {
    if (colorSelectionMode === 'auto') {
      generateAutomaticColorPalette();
    }
  }, [colorSelectionMode]);

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const newFilesArray = Array.from(files);
    if ((imageItems.length + newFilesArray.length) > 10) {
      toast.error("Não pode selecionar mais de 10 imagens no total."); return;
    }
    const newImageItemsToAdd: { id: string; file: File; preview: string }[] = [];
    for (const file of newFilesArray) {
      if ((imageItems.length + newImageItemsToAdd.length) >= 10) { toast.error("Limite de 10 imagens atingido."); break; }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) { toast.error(`Ficheiro ${file.name} inválido. Apenas JPG/PNG.`); continue; }
      if (file.size > 3 * 1024 * 1024) { toast.error(`Ficheiro ${file.name} excede o tamanho máximo de 3MB.`); continue; }
      newImageItemsToAdd.push({ id: `${file.name}-${Date.now()}-${Math.random()}`, file, preview: URL.createObjectURL(file) });
    }
    setImageItems(prev => [...prev, ...newImageItemsToAdd].slice(0, 10));
  };

  const removeImage = (indexToRemove: number) => {
    const itemToRemove = imageItems[indexToRemove];
    if (itemToRemove) URL.revokeObjectURL(itemToRemove.preview);
    setImageItems(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleVideoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) { setVideoFile(null); if (videoFilePreview) URL.revokeObjectURL(videoFilePreview); setVideoFilePreview(null); return; }
    if (file.type !== "video/mp4") { toast.error("Formato de vídeo inválido. Apenas ficheiros .mp4 são permitidos."); setVideoFile(null); if (videoFilePreview) URL.revokeObjectURL(videoFilePreview); setVideoFilePreview(null); return; }
    if (file.size > 50 * 1024 * 1024) { toast.error("O ficheiro de vídeo excede o tamanho máximo de 50MB."); setVideoFile(null); if (videoFilePreview) URL.revokeObjectURL(videoFilePreview); setVideoFilePreview(null); return; }
    setVideoFile(file);
    if (videoFilePreview) URL.revokeObjectURL(videoFilePreview);
    setVideoFilePreview(URL.createObjectURL(file));
    setVideoUrl("");
  };

  const handleVideoUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value); setVideoFile(null); if (videoFilePreview) URL.revokeObjectURL(videoFilePreview); setVideoFilePreview(null);
  };

  function handleImageDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImageItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const handleBenefitChange = (index: number, field: "text" | "icon", value: string) => {
    const newBenefits = [...benefitItems];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setBenefitItems(newBenefits);
  };

  const addBenefitItem = () => setBenefitItems([...benefitItems, { id: `benefit-${Date.now()}-${benefitItems.length}`, text: "", icon: "" }]);
  const removeBenefitItem = (indexToRemove: number) => setBenefitItems(prev => prev.filter((_, index) => index !== indexToRemove));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setIsLoading(true);
    if (!currentUser) { toast.error("Utilizador não autenticado. Por favor, inicie sessão."); setIsLoading(false); return; }
    if (!title.trim()) { toast.error("O título da página é obrigatório."); setIsLoading(false); return; }
    if (videoChoice === "url" && videoUrl.trim() && !videoUrl.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+/)) {
      toast.error("URL do vídeo inválido. Por favor, insira um link do YouTube ou Vimeo válido."); setIsLoading(false); return;
    }

    let uploadedImageMetadata: { path: string; name: string; size: number; type: string; order: number }[] = [];
    let videoStoragePath: string | null = null;

    try {
      if (imageItems.length > 0) {
        const uploadPromises = imageItems.map(async (item, index) => {
          const fileName = `${Date.now()}-${item.file.name.replace(/\s+/g, "_")}`;
          const filePath = `${currentUser.id}/images/${fileName}`;
          const { error: uploadError } = await supabase.storage.from("landing_page_assets").upload(filePath, item.file, { cacheControl: "3600", upsert: false });
          if (uploadError) throw new Error(`Falha ao carregar ${item.file.name}: ${uploadError.message}`);
          return { path: filePath, name: item.file.name, size: item.file.size, type: item.file.type, order: index };
        });
        uploadedImageMetadata = await Promise.all(uploadPromises);
      }

      if (videoChoice === "upload" && videoFile) {
        const videoFileName = `${Date.now()}-${videoFile.name.replace(/\s+/g, "_")}`;
        const videoFilePath = `${currentUser.id}/videos/${videoFileName}`;
        const { error: videoUploadError } = await supabase.storage.from("landing_page_assets").upload(videoFilePath, videoFile, { cacheControl: "3600", upsert: false });
        if (videoUploadError) throw new Error(`Falha ao carregar o vídeo: ${videoUploadError.message}`);
        videoStoragePath = videoFilePath;
      }

      const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const uniqueSlug = `${slug}-${Date.now().toString(36).slice(-6)}`;
      const finalBenefitItems = benefitItems.filter(b => b.text.trim() !== "").map(({id, ...rest}) => rest);

      const pageDataToInsert = {
        user_id: currentUser.id, 
        title, 
        description, 
        description_professional_ai: descriptionProfessional,
        slug: uniqueSlug,
        images_gallery: uploadedImageMetadata.length > 0 ? uploadedImageMetadata : null,
        video_embed_url: videoChoice === "url" && videoUrl.trim() ? videoUrl.trim() : null,
        video_storage_path: videoStoragePath,
        benefits_features: finalBenefitItems.length > 0 ? finalBenefitItems : null,
        cta_button_text: ctaButtonText.trim() || "Contactar Agora",
        cta_contact_form_enabled: true,
        is_public: true,
        color_palette: colorPalette
      };

      const { error: insertError } = await supabase.from("pages").insert([pageDataToInsert]);
      if (insertError) throw new Error(`Erro ao guardar a landing page: ${insertError.message}`);
      
      toast.success("Landing page criada com sucesso!");
      router.push("/dashboard?success=page_created");

    } catch (e: any) {
      console.error("Erro no processo de submissão:", e);
      toast.error(e.message || "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const imageItemIds = useMemo(() => imageItems.map(item => item.id), [imageItems]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Criar Nova Landing Page</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título da Página <span className="text-red-500">*</span></label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-class" placeholder="Ex: Apartamento T3 com Vista Mar" required />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
            Descrição
            <div className="ml-2 relative">
              <button 
                type="button" 
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                disabled={isProcessingVoice}
                className={`p-2 rounded-full ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-500 text-white'} ${isProcessingVoice ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'}`}
                title={isRecording ? "Parar gravação" : "Gravar descrição falada"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isRecording ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  )}
                </svg>
              </button>
            </div>
          </label>
          <div className="relative">
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={5} 
              className="textarea-class" 
              placeholder="Descreva brevemente o seu imóvel, produto ou serviço... Ou clique no ícone do microfone para ditar." 
            />
            {isRecording && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-md">
                <div className="text-center p-4 bg-white rounded-lg shadow-lg">
                  <div className="flex space-x-2 justify-center items-center mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-300"></div>
                  </div>
                  <p className="font-medium">A gravar...</p>
                  <button 
                    type="button" 
                    onClick={stopVoiceRecording} 
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Parar
                  </button>
                </div>
              </div>
            )}
          </div>
          {isProcessingVoice && (
            <p className="text-sm text-blue-600 mt-1 animate-pulse">A processar e melhorar o texto com IA...</p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Galeria de Imagens (máx. 10, 3MB/cada, JPG/PNG) - Arraste para reordenar</label>
          <input type="file" id="images" multiple accept=".jpg,.jpeg,.png" onChange={handleImageFileChange} className="input-file-class" />
          {imageItems.length > 0 && (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleImageDragEnd}>
              <SortableContext items={imageItemIds} strategy={rectSortingStrategy}>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imageItems.map((item, index) => (<SortableImageItem key={item.id} id={item.id} preview={item.preview} index={index} onRemove={removeImage} />))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Vídeo (Opcional)</label>
          <div className="space-y-2 mb-2">
            <label className="inline-flex items-center"><input type="radio" name="videoOption" value="none" checked={videoChoice === "none"} onChange={() => { setVideoChoice("none"); setVideoUrl(""); setVideoFile(null); setVideoFilePreview(null);}} className="form-radio"/><span className="ml-2">Nenhum</span></label>
            <label className="inline-flex items-center ml-4"><input type="radio" name="videoOption" value="url" checked={videoChoice === "url"} onChange={() => {setVideoChoice("url"); setVideoFile(null); setVideoFilePreview(null);}} className="form-radio"/><span className="ml-2">Link YouTube/Vimeo</span></label>
            <label className="inline-flex items-center ml-4"><input type="radio" name="videoOption" value="upload" checked={videoChoice === "upload"} onChange={() => {setVideoChoice("upload"); setVideoUrl("");}} className="form-radio"/><span className="ml-2">Carregar Ficheiro MP4</span></label>
          </div>
          {videoChoice === "url" && <input type="url" id="videoUrl" value={videoUrl} onChange={handleVideoUrlChange} className="input-class" placeholder="https://youtube.com/... ou https://vimeo.com/..." />}
          {videoChoice === "upload" && ( <div> <input type="file" id="videoFile" accept=".mp4" onChange={handleVideoFileChange} className="input-file-class style-green" /> {videoFilePreview && <p className="text-sm text-gray-600 mt-1">Ficheiro: {videoFile?.name}</p>} </div> )}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Benefícios / Características</label>
          {benefitItems.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2 mb-2">
              <input type="text" value={item.icon} onChange={(e) => handleBenefitChange(index, "icon", e.target.value)} className="input-class w-1/4" placeholder="Ícone (opcional)" />
              <input type="text" value={item.text} onChange={(e) => handleBenefitChange(index, "text", e.target.value)} className="input-class w-2/4" placeholder={`Benefício ${index + 1}`} />
              <button type="button" onClick={() => removeBenefitItem(index)} className="text-red-500 hover:text-red-700 font-semibold p-1 rounded-full hover:bg-red-100 text-xs" aria-label="Remover benefício">Remover</button>
            </div>
          ))}
          <button type="button" onClick={addBenefitItem} className="mt-2 text-blue-500 hover:text-blue-700 font-semibold text-sm">+ Adicionar mais</button>
        </div>
        
        <div>
          <label htmlFor="ctaButtonText" className="block text-gray-700 text-sm font-bold mb-2">Texto do Botão de Contacto (Call to Action)</label>
          <input type="text" id="ctaButtonText" value={ctaButtonText} onChange={(e) => setCtaButtonText(e.target.value)} className="input-class" placeholder="Ex: Fale Connosco" />
        </div>
        
        {/* Personalização Visual - Paleta de Cores */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Personalização Visual</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Modo de Seleção de Cores</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="colorMode" 
                  value="manual" 
                  checked={colorSelectionMode === "manual"} 
                  onChange={() => setColorSelectionMode("manual")} 
                  className="form-radio"
                />
                <span className="ml-2">Escolha Manual</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  name="colorMode" 
                  value="auto" 
                  checked={colorSelectionMode === "auto"} 
                  onChange={() => setColorSelectionMode("auto")} 
                  className="form-radio"
                />
                <span className="ml-2">Geração Automática</span>
              </label>
            </div>
          </div>
          
          {colorSelectionMode === "manual" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="primaryColor" className="block text-gray-700 text-sm font-bold mb-2">Cor Primária</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    id="primaryColor" 
                    value={colorPalette.primary} 
                    onChange={(e) => setColorPalette({...colorPalette, primary: e.target.value})} 
                    className="h-10 w-10 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={colorPalette.primary} 
                    onChange={(e) => setColorPalette({...colorPalette, primary: e.target.value})} 
                    className="input-class" 
                    placeholder="#RRGGBB"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="secondaryColor" className="block text-gray-700 text-sm font-bold mb-2">Cor Secundária</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    id="secondaryColor" 
                    value={colorPalette.secondary} 
                    onChange={(e) => setColorPalette({...colorPalette, secondary: e.target.value})} 
                    className="h-10 w-10 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={colorPalette.secondary} 
                    onChange={(e) => setColorPalette({...colorPalette, secondary: e.target.value})} 
                    className="input-class" 
                    placeholder="#RRGGBB"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="accentColor" className="block text-gray-700 text-sm font-bold mb-2">Cor de Destaque</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    id="accentColor" 
                    value={colorPalette.accent} 
                    onChange={(e) => setColorPalette({...colorPalette, accent: e.target.value})} 
                    className="h-10 w-10 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={colorPalette.accent} 
                    onChange={(e) => setColorPalette({...colorPalette, accent: e.target.value})} 
                    className="input-class" 
                    placeholder="#RRGGBB"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <button 
                  type="button" 
                  onClick={generateAutomaticColorPalette} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Gerar Nova Paleta
                </button>
                <div className="flex space-x-2">
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colorPalette.primary }}></div>
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colorPalette.secondary }}></div>
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colorPalette.accent }}></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Cores geradas automaticamente. Clique no botão para gerar uma nova combinação.</p>
            </div>
          )}
          
          {/* Pré-visualização da paleta */}
          <div className="mt-6 p-4 border rounded-lg">
            <h4 className="text-sm font-bold mb-2">Pré-visualização da Paleta</h4>
            <div className="flex flex-wrap gap-2">
              <div className="p-4 rounded-lg text-white" style={{ backgroundColor: colorPalette.primary }}>
                Cor Primária
              </div>
              <div className="p-4 rounded-lg text-white" style={{ backgroundColor: colorPalette.secondary }}>
                Cor Secundária
              </div>
              <div className="p-4 rounded-lg text-white" style={{ backgroundColor: colorPalette.accent }}>
                Cor de Destaque
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <button type="submit" disabled={isLoading} className="btn-primary disabled:bg-gray-400">{isLoading ? "A Guardar..." : "Guardar Landing Page"}</button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">Cancelar</button>
        </div>
      </form>
      <style jsx global>{`
        .input-class { display: block; width: 100%; padding: 0.75rem; border-radius: 0.375rem; border: 1px solid #D1D5DB; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .input-class:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); }
        .textarea-class { display: block; width: 100%; padding: 0.75rem; border-radius: 0.375rem; border: 1px solid #D1D5DB; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .textarea-class:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); }
        .input-file-class { display: block; width: 100%; font-size: 0.875rem; color: #1F2937; border: 1px solid #D1D5DB; border-radius: 0.375rem; cursor: pointer; background-color: #F9FAFB; padding: 0.5rem; }
        .input-file-class::file-selector-button { margin-right: 1rem; padding: 0.5rem 1rem; border-radius: 9999px; border-width: 0px; font-size: 0.875rem; font-weight: 600; background-color: #EFF6FF; color: #2563EB; }
        .input-file-class:hover::file-selector-button { background-color: #DBEAFE; }
        .input-file-class.style-green::file-selector-button { background-color: #F0FDF4; color: #16A34A; }
        .input-file-class.style-green:hover::file-selector-button { background-color: #DCFCE7; }
        .btn-primary { background-color: #3B82F6; color: white; font-weight: bold; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        .btn-primary:hover { background-color: #2563EB; }
        .btn-secondary { background-color: #6B7280; color: white; font-weight: bold; padding: 0.5rem 1rem; border-radius: 0.375rem; }
        .btn-secondary:hover { background-color: #4B5563; }
      `}</style>
    </div>
  );
}
