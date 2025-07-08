import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, MapPin, Building, Star } from "lucide-react";

interface Candidate {
  name: string;
  profileUrl: string;
  platform: string;
  summary: string;
}

interface CandidateCardsBubbleProps {
  candidates: Candidate[];
}

const CandidateCardsBubble = ({ candidates }: CandidateCardsBubbleProps) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Found {candidates.length} candidates
          </h3>
          <p className="text-sm text-gray-600">
            Here are the top matches for your search:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {candidates.map((candidate, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                        {candidate.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-semibold text-gray-900 truncate">
                        {candidate.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {candidate.platform}
                        </Badge>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs ml-1">4.5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-xs text-gray-600 line-clamp-3">
                  {candidate.summary}
                </CardDescription>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Remote</span>
                  </div>

                  <a
                    href={candidate.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Profile
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateCardsBubble;
