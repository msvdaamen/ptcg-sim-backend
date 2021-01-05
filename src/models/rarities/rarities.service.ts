import {Injectable} from "@nestjs/common";
import {RarityRepository} from "./rarity.repository";

@Injectable()
export class RaritiesService {

    constructor(
        private readonly rarityRepository: RarityRepository
    ) {
    }

    all() {
        return this.rarityRepository.find();
    }
}
