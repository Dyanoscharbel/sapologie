"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Crown, Heart, Star, Sparkles, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Navigation, Footer } from "@/components/navigation";
import { mockParticipants as participants } from "@/lib/participants-data";

const totalVotes = (list: typeof participants) => list.reduce((sum, p) => sum + (p.votes ?? 0), 0);

export default function Home() {
  const [votedFor, setVotedFor] = useState<number[]>([]);
  const trending = useMemo(() => [...participants].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0)).slice(0, 3), []);
  const juryPick = useMemo(() => participants.slice(0, 3), []);

  const handleVote = (participantId: number) => {
    if (!votedFor.includes(participantId)) {
      setVotedFor([...votedFor, participantId]);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/5 to-purple-500/5 blur-3xl" />
      </div>

      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 overflow-hidden">
          <div className="container-premium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <div className="space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Édition Premium 2025</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gradient">Le royaume</span>
                  <br />
                  du style et de
                  <br />
                  <span className="text-gradient">l'élégance</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Rejoignez le plus prestigieux concours de sapologie. Inspirez, défilez, votez. 
                  Qui montera sur le podium des tendances cette saison ?
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="h-12 px-8 rounded-xl text-base btn-glow hover-lift group"
                    asChild
                  >
                    <Link href="/vote">
                      <TrendingUp className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                      Découvrir et voter
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-12 px-8 rounded-xl text-base hover-lift"
                    asChild
                  >
                    <Link href="/register">
                      Participer au concours
                    </Link>
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  <div className="card-premium p-4 hover-lift">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{participants.length}</div>
                        <div className="text-xs text-muted-foreground">Participants</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-premium p-4 hover-lift">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-rose-500/10">
                        <Heart className="h-5 w-5 text-rose-500" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{totalVotes(participants)}</div>
                        <div className="text-xs text-muted-foreground">Votes</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-premium p-4 hover-lift sm:col-span-1 col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <Award className="h-5 w-5 text-amber-500" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">24h</div>
                        <div className="text-xs text-muted-foreground">Avant la finale</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative animate-scale-in">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden card-premium group">
                  <img
                    src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=800&h=1000&fit=crop"
                    alt="Portrait élégant du concours de sapologie"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-4">
                    <p className="text-white text-sm font-medium mb-1">Édition actuelle</p>
                    <p className="text-white/80 text-xs">Le Roi de la Sapologie 2025</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 -top-4 -right-4 h-full w-full rounded-3xl bg-primary/20 blur-xl" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-premium">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">Tendances du moment</h2>
                <p className="text-muted-foreground">Les styles les plus appréciés de la semaine</p>
              </div>
              <Button variant="ghost" className="group" asChild>
                <Link href="/vote">
                  Voir tout
                  <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trending.map((participant, index) => (
                <article key={participant.id} className="card-premium overflow-hidden group p-3 sm:p-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img 
                      src={participant.photos?.[0] || `https://images.unsplash.com/photo-149036753220${index}-b9bc1dc483f6?w=400&h=400&fit=crop`} 
                      alt={`Style de ${participant.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-foreground">
                      #{index + 1}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      <Link href={`/participant/${participant.id}`} className="hover:text-primary transition-colors">
                        {participant.name}
                      </Link>
                    </CardTitle>
                    <CardDescription>{participant.category ?? "Style"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4 text-rose-500" aria-hidden="true" />
                        <span className="font-semibold">{participant.votes ?? 0}</span>
                        <span>votes</span>
                      </div>
                      <Button variant="outline" size="sm" className="hover-lift" asChild>
                        <Link href={`/participant/${participant.id}`}>Voir le profil</Link>
                      </Button>
                    </div>
                  </CardContent>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container-premium">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pourquoi nous rejoindre ?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une expérience unique dédiée à la célébration du style et de l'élégance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-premium p-8 text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sélection premium</h3>
                <p className="text-muted-foreground">
                  Des looks de haute qualité, curatés par la communauté et notre jury d'experts
                </p>
              </div>
              
              <div className="card-premium p-8 text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-rose-500" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Communauté engagée</h3>
                <p className="text-muted-foreground">
                  Un système de vote transparent et équitable pour chaque participant
                </p>
              </div>
              
              <div className="card-premium p-8 text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 mb-6 group-hover:scale-110 transition-transform">
                  <Crown className="h-8 w-8 text-purple-500" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expérience raffinée</h3>
                <p className="text-muted-foreground">
                  Un design moderne, accessible et optimisé pour tous les appareils
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* All Participants Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-premium">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tous les participants</h2>
              <p className="text-lg text-muted-foreground">
                Découvrez tous les talents de cette édition
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {participants.map((participant) => (
                <article key={participant.id} className="card-premium overflow-hidden group p-3 sm:p-4">
                  <CardHeader className="text-center pb-4">
                    <Link 
                      href={`/participant/${participant.id}`} 
                      className="block"
                    >
                      <Avatar className="h-24 w-24 mx-auto mb-4 ring-2 ring-muted group-hover:ring-primary transition-all">
                        <AvatarImage src={participant.photos?.[0] || `https://api.dicebear.com/7.x/avataaars/svg?seed=${participant.name}`} alt={participant.name} />
                        <AvatarFallback className="text-2xl">
                          {participant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {participant.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {participant.category ?? "Style"}
                      </CardDescription>
                    </Link>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {participant.bio}
                    </p>
                    
                    {participant.socialLinks && Object.keys(participant.socialLinks).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(participant.socialLinks).slice(0, 2).map(([platform, handle]) => (
                          <Badge key={platform} variant="secondary" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Heart className={`h-4 w-4 ${votedFor.includes(participant.id) ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`} aria-hidden="true" />
                        <span className="font-semibold">{participant.votes ?? 0}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleVote(participant.id)}
                          disabled={votedFor.includes(participant.id)}
                          size="sm"
                          variant={votedFor.includes(participant.id) ? "default" : "outline"}
                          className={votedFor.includes(participant.id) ? "bg-rose-500 hover:bg-rose-600" : ""}
                        >
                          {votedFor.includes(participant.id) ? "Voté !" : "Voter"}
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/participant/${participant.id}`}>
                            Voir
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-600" aria-hidden="true" />
          
          <div className="container-premium relative">
            <div className="max-w-3xl mx-auto text-center text-white space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Prêt à montrer votre style ?
              </h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Inscrivez-vous dès maintenant, créez votre profil avec vos plus belles photos 
                et laissez la communauté voter pour votre style unique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="h-12 px-8 rounded-xl text-base hover-lift"
                  asChild
                >
                  <Link href="/register">
                    <Crown className="mr-2 h-5 w-5" aria-hidden="true" />
                    Rejoindre le concours
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 px-8 rounded-xl text-base border-white/20 text-slate-900 hover:bg-white/10 hover-lift"
                  asChild
                >
                  <Link href="/about">
                    En savoir plus
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
