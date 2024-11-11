// admin.model.ts
import { Users } from './user.model';

export interface Client extends Users {
    // Additional properties specific to Admin
}
