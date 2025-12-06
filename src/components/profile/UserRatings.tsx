import P from "../common/P.tsx";
import {RatingService} from "../../services/RatingService.ts";
import {useCallback, useEffect, useState} from "react";
import type {RatingResponse} from "../../types/RatingResponse.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {Avatar} from "../common/Avatar.tsx";
import {StarIcon} from "@phosphor-icons/react";

export default function UserRatings() {

    const userId = useAuth().authData?.id;
    const ratingsService = RatingService.getInstance();
    const [loadingRatings, setLoadingRatings] = useState(false);
    const [ratings, setRatings] = useState<RatingResponse[]>([]);

    const fetchRatings = useCallback(async () => {
        if (!userId) return;
        try {
            setLoadingRatings(true);
            const fetchedRatings = await ratingsService.getAllRatingsFromCurrentUser(userId);
            console.log('Ratings fetched:', fetchedRatings);
            setRatings(fetchedRatings);
        } catch (error) {
            console.error('Error fetching ratings:', error);
        } finally {
            setLoadingRatings(false);
        }
    }, [userId, ratingsService]);

    useEffect(() => {
        fetchRatings();
    }, [fetchRatings]);

    if (loadingRatings) {
        return (<div className="flex flex-col items-center justify-center py-16 text-center">
            <P className="text-neutral-medium text-lg">Carregando avaliações...</P>
        </div>);
    }

    if (ratings.length === 0) {
        return (<div className="flex flex-col items-center justify-center py-16 text-center">
            <P className="text-neutral-medium text-lg">Nenhuma avaliação encontrada.</P>
        </div>);
    }

    return (<div className="flex flex-col space-y-6">

            <div className="flex items-center justify-between rounded-lg bg-primary-dark p-4">
                {(() => {
                    const avgRaw = ratings.length > 0 ? (ratings[ratings.length - 1].ratedUser?.averageRating ?? 0) : 0;
                    const numberOfRatings = ratings.length ?? 0;
                    const avg = typeof avgRaw === "number" ? avgRaw : parseFloat(String(avgRaw)) || 0;
                    const filledCount = Math.floor(avg);

                    return (
                        <div className="flex flex-col items-center w-full">
                            <div className="text-2xl text-white">
                                <span className="font-bold text-white">{avg.toFixed(1)}</span>
                            </div>

                            <div className="flex items-center py-2">
                                {Array.from({ length: 5 }).map((_, i) => {
                                    const isFilled = i < filledCount;
                                    return (
                                        <StarIcon
                                            key={i}
                                            weight={isFilled ? "fill" : "regular"}
                                            color={isFilled ? "#FBBF24" : undefined}
                                            className={isFilled ? "mx-0.5" : "text-white stroke-neutral-medium mx-0.5"}
                                        />
                                    );
                                })}
                            </div>

                            <div className="text-xs text-white mt-1">
                                Baseado em {numberOfRatings} avaliações.
                            </div>
                        </div>
                    );
                })()}
            </div>

            <div className="w-full flex items-center justify-self-end">
                Avaliações recebidas
            </div>

            {ratings.map((rating) => {
                const rater = rating.ratedBy;
                const displayName = (rater?.firstName || rater?.lastName) ? `${rater?.firstName ?? ''} ${rater?.lastName ?? ''}`.trim() : 'Usuário Anônimo';
                const filledCount = Math.floor(rating?.score ?? 0);

                return (<div key={rating.id} className="border border-neutral-light rounded-lg p-4 shadow-sm">
                        <div className="flex items-start">
                            <div className="flex-none w-20 mr-4">
                                <Avatar
                                    className="h-16 w-16 rounded-md object-cover"
                                    image={rater?.picture}
                                    alt="Avatar do usuário"
                                />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between font-semibold text-primary-dark">
                                    <div className="flex self-start">
                                        {displayName}
                                    </div>
                                    <div className="text-sm text-neutral-medium font-normal">
                                        {rating.createdAt ? new Date(rating.createdAt).toLocaleDateString() : ''}
                                    </div>
                                </div>

                                <div className="flex items-center mt-2">
                                    <div className="flex items-center text-sm text-neutral-dark">
                                        {Array.from({length: 5}).map((_, i) => {
                                            const isFilled = i < filledCount;
                                            return (<StarIcon
                                                key={i}
                                                weight={isFilled ? "fill" : "regular"}
                                                color={isFilled ? "#FBBF24" : undefined}
                                                className={isFilled ? "mr-1" : "text-white stroke-neutral-medium mr-1"}
                                            />);
                                        })}
                                        <span className="ml-2 font-bold">{(rating?.score ?? 0).toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-neutral-dark">
                            <p className="mt-1">{rating.comment || 'Sem comentário fornecido.'}</p>
                        </div>
                    </div>);
            })}
        </div>

        // <div className="flex flex-col items-center justify-center py-16 text-center">
        //     <P className="text-neutral-medium text-lg">Configurações Avançadas</P>
        //     <p className="text-sm text-neutral-medium mt-2">
        //         As configurações avançadas estarão disponíveis em breve.
        //     </p>
        // </div>
    );
}
