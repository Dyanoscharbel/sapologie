import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { AuthService } from '@/services/auth.service';

// GET - Récupérer toutes les compétitions
export async function GET(request: Request) {
  try {
    // Vérifier l'authentification admin
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 401 }
      );
    }

    const user = await AuthService.getCurrentUser(token);
    
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Accès refusé' },
        { status: 403 }
      );
    }

    // Récupérer toutes les compétitions
    const competitions = await query(`
      SELECT 
        id,
        name as title,
        description,
        start_date,
        end_date,
        prize_first,
        prize_second,
        prize_third,
        is_active,
        created_at,
        updated_at
      FROM competitions
      ORDER BY created_at DESC
    `) as any[];

    // Formater les données
    const formattedCompetitions = competitions.map(comp => {
      const startDate = new Date(comp.start_date);
      const endDate = new Date(comp.end_date);
      
      return {
        id: comp.id,
        title: comp.title,
        description: comp.description,
        startDate: startDate.toISOString().split('T')[0], // Format YYYY-MM-DD
        endDate: endDate.toISOString().split('T')[0], // Format YYYY-MM-DD
        startDateFormatted: startDate.toLocaleDateString('fr-FR'), // Format d'affichage
        endDateFormatted: endDate.toLocaleDateString('fr-FR'), // Format d'affichage
        prizeFirst: comp.prize_first,
        prizeSecond: comp.prize_second,
        prizeThird: comp.prize_third,
        isActive: Boolean(comp.is_active),
        createdAt: new Date(comp.created_at).toLocaleDateString('fr-FR'),
        updatedAt: comp.updated_at ? new Date(comp.updated_at).toLocaleDateString('fr-FR') : null
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedCompetitions
    });

  } catch (error: any) {
    console.error('Erreur lors de la récupération des compétitions:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur', error: error.message },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle compétition
export async function POST(request: Request) {
  try {
    // Vérifier l'authentification admin
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 401 }
      );
    }

    const user = await AuthService.getCurrentUser(token);
    
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Accès refusé' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, startDate, endDate, prizeFirst, prizeSecond, prizeThird, isActive } = body;

    // Validation
    if (!title || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: 'Titre, date de début et date de fin sont requis' },
        { status: 400 }
      );
    }

    // Créer la compétition
    const result = await query(`
      INSERT INTO competitions (name, description, start_date, end_date, prize_first, prize_second, prize_third, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, description || '', startDate, endDate, prizeFirst || '', prizeSecond || '', prizeThird || '', isActive ? 1 : 0]) as any;

    return NextResponse.json({
      success: true,
      message: 'Compétition créée avec succès',
      data: { id: result.insertId }
    });

  } catch (error: any) {
    console.error('Erreur lors de la création de la compétition:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur', error: error.message },
      { status: 500 }
    );
  }
}
